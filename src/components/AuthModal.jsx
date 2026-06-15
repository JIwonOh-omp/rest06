import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const KakaoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.74 1.72 5.15 4.32 6.58L5.2 21l4.46-2.62c.74.12 1.53.18 2.34.18 5.52 0 10-3.48 10-7.8C22 6.48 17.52 3 12 3z" fill="#3C1E1E"/>
  </svg>
);

export default function AuthModal({ onClose }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(null);
  const { signInWithGoogle, signInWithKakao } = useAuth();

  useEffect(() => {
    document.body.classList.add('locked');
    requestAnimationFrame(() => setShow(true));
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('locked'); window.removeEventListener('keydown', onKey); };
  }, []);

  const close = () => { setShow(false); setTimeout(onClose, 300); };

  const handleGoogle = async () => {
    setLoading('google');
    await signInWithGoogle();
  };

  const handleKakao = async () => {
    setLoading('kakao');
    await signInWithKakao();
  };

  return (
    <div className={'auth-modal-back' + (show ? ' show' : '')} onClick={(e) => { if (e.target.classList.contains('auth-modal-back')) close(); }}>
      <div className="auth-modal">
        <button className="modal-close" onClick={close} aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18"/>
          </svg>
        </button>

        <div className="auth-modal-top">
          <div className="auth-yarn">
            <svg viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" fill="var(--coral)"/>
              <g stroke="rgba(255,255,255,.5)" strokeWidth="1.4" fill="none" strokeLinecap="round">
                <path d="M10 22c9 4 20 4 30-2M8 30c10 5 24 3 34-4M10 38c9 3 20 2 30-5"/>
                <path d="M20 6c-3 10-2 28 4 44M32 5c-2 12 0 28 6 40"/>
              </g>
            </svg>
          </div>
          <h2 className="auth-title">함께 시작해요</h2>
          <p className="auth-sub">로그인하고 나만의 클래스를 수강해보세요</p>
        </div>

        <div className="auth-btns">
          <button
            className="auth-btn auth-btn-google"
            onClick={handleGoogle}
            disabled={!!loading}
          >
            <GoogleIcon />
            <span>{loading === 'google' ? '연결 중…' : '구글로 시작하기'}</span>
          </button>

          <button
            className="auth-btn auth-btn-kakao"
            onClick={handleKakao}
            disabled={!!loading}
          >
            <KakaoIcon />
            <span>{loading === 'kakao' ? '연결 중…' : '카카오로 시작하기'}</span>
          </button>
        </div>

        <p className="auth-notice">로그인 시 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.</p>
      </div>
    </div>
  );
}
