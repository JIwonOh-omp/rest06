import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function getDisplayName(user) {
  if (!user) return '';
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    '사용자'
  );
}

function getAvatarUrl(user) {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
}

function getInitial(user) {
  const name = getDisplayName(user);
  return name.charAt(0).toUpperCase();
}

export default function UserMenu({ onLoginClick }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) {
    return (
      <button className="btn btn-ghost login-btn" onClick={onLoginClick}>
        로그인
      </button>
    );
  }

  const avatarUrl = getAvatarUrl(user);
  const displayName = getDisplayName(user);

  return (
    <div className="user-menu" ref={ref}>
      <button className="user-avatar-btn" onClick={() => setOpen((v) => !v)} aria-label="사용자 메뉴">
        {avatarUrl
          ? <img src={avatarUrl} alt={displayName} className="user-avatar-img" referrerPolicy="no-referrer" />
          : <div className="user-avatar-fallback">{getInitial(user)}</div>
        }
        <span className="user-name">{displayName.split(' ')[0]}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            {avatarUrl
              ? <img src={avatarUrl} alt={displayName} className="user-avatar-img lg" referrerPolicy="no-referrer" />
              : <div className="user-avatar-fallback lg">{getInitial(user)}</div>
            }
            <div>
              <div className="ud-name">{displayName}</div>
              <div className="ud-email">{user.email}</div>
            </div>
          </div>
          <hr className="ud-divider" />
          <button className="ud-item" onClick={() => { setOpen(false); signOut(); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
