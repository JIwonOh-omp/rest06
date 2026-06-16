import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const WelcomeMessage = {
  role: 'assistant',
  content: '안녕하세요! 🎂 piece of cake 상담 어시스턴트 케이크예요.\n클래스 추천, 수강 방법, 요금제 등 궁금한 점을 물어보세요!',
};

function BotIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="var(--coral)" />
      <path d="M11 21 L11 38 L41 30 Z" fill="#F7D49B" stroke="#C9883B" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11 28 L41 30 L11 31 Z" fill="#FFF3DF"/>
      <path d="M11 21 L41 30 L11 24.5 Z" fill="white" opacity=".7"/>
      <path d="M16 13 q3.5-2 7 0 q-1.8 2.2-3.5 1.4 q-1.7.8-3.5-1.4z" fill="#5FB85C" stroke="#3E9E45" strokeWidth=".6"/>
      <path d="M19.5 13.2c3 0 5 2.5 4.4 5 c-.5 2.3-2.5 3.5-4.4 3.5 s-3.9-1.2-4.4-3.5c-.6-2.5 1.4-5 4.4-5z" fill="#EE4338" stroke="#CE2F26" strokeWidth=".7"/>
      <ellipse cx="18" cy="15" rx="1.2" ry=".8" fill="white" opacity=".4"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WelcomeMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const history = [...messages.filter(m => m.role !== 'assistant' || m !== WelcomeMessage), userMsg];
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: history },
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '잠시 오류가 발생했어요. 다시 시도해 주세요 😢' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className={'chat-widget' + (open ? ' is-open' : '')}>
      {/* 채팅 팝업 — 클러스터 밖, float 안 함 */}
      <div className={'chat-popup' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="chat-header">
          <div className="chat-header-info">
            <BotIcon />
            <div>
              <div className="chat-title">케이크 상담봇</div>
              <div className="chat-status"><span className="chat-dot" />온라인</div>
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="닫기">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18"/>
            </svg>
          </button>
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={'chat-msg ' + m.role}>
              {m.role === 'assistant' && <div className="chat-avatar"><BotIcon /></div>}
              <div className="chat-bubble">
                {m.content.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < m.content.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg assistant">
              <div className="chat-avatar"><BotIcon /></div>
              <div className="chat-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-footer">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="메시지를 입력하세요…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            disabled={loading}
          />
          <button className="chat-send" onClick={send} disabled={!input.trim() || loading} aria-label="전송">
            <SendIcon />
          </button>
        </div>
      </div>

      {/* 풍선 도움말 + FAB — 하나의 클러스터로 float */}
      <div className="chat-cluster">
        {!open && (
          <div className="chat-tooltip" onClick={() => setOpen(true)}>
            <p>💬 AI 학습 도우미 — 특강 일정·n8n·AI 영상 등 궁금한 건 여기서 물어보세요!</p>
            <span className="chat-tooltip-cta">채팅 시작 ↗</span>
          </div>
        )}
        <button
          className={'chat-fab' + (open ? ' active' : '')}
          onClick={() => setOpen(v => !v)}
          aria-label="상담 채팅 열기"
        >
          {open
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          }
        </button>
      </div>
    </div>
  );
}
