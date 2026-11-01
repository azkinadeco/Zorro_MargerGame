import { useState } from 'react';
import { useGameCtx, saveGame } from '../game/useGame';
import { Modal, Btn, Icon, Bar, RewardChips, fmtTime } from './common';
import { ItemArt } from '../art/ItemArt';
import { FEST_TRACK, FEST_LEVEL, festTheme, festEndsIn, ACHIEVEMENTS, ACH_GEMS, achState } from '../game/meta';
import { claimFest, claimAch } from '../game/engine';
import { useNow } from './TopBar';
import { sfx } from '../game/audio';

// ---------------------------------------------------------------- festival
export function FestivalModal({ onClose }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const fest = state.fest || { pts: 0, claimed: [], week: '0' };
  const theme = festTheme(fest.week);
  const locked = state.level < FEST_LEVEL;
  const nextIdx = FEST_TRACK.findIndex((m) => fest.pts < m.pts);
  const prevPts = nextIdx > 0 ? FEST_TRACK[nextIdx - 1].pts : 0;
  return (
    <Modal title="Festival Mingguan" onClose={onClose} className="fest">
      <div className="fest-head" style={{ '--fc': theme.color }}>
        <div className="fest-art">
          <ItemArt id={theme.icon} />
        </div>
        <div>
          <b>{theme.name}</b>
          <small>Berakhir dalam {fmtTime(festEndsIn(now))}</small>
        </div>
      </div>
      {locked ? (
        <p className="center warn">Festival terbuka di level {FEST_LEVEL}.</p>
      ) : (
        <>
          <div className="fest-pts">
            <Icon name="tent" size={26} />
            <b>{fest.pts}</b>
            <span>poin festival</span>
          </div>
          {nextIdx >= 0 && (
            <div className="fest-next">
              <Bar value={fest.pts - prevPts} max={FEST_TRACK[nextIdx].pts - prevPts} className="bar-pink" />
              <small>{FEST_TRACK[nextIdx].pts - fest.pts} poin lagi ke hadiah berikutnya</small>
            </div>
          )}
          <p className="muted center small">Sajikan pesanan (+1 poin per item, tamu VIP +3) dan renovasi (+2) untuk mengumpulkan poin.</p>
        </>
      )}
      <div className="fest-track">
        {FEST_TRACK.map((m, i) => {
          const claimed = fest.claimed.includes(i);
          const ready = !locked && fest.pts >= m.pts && !claimed;
          return (
            <div key={i} className={`fest-step ${claimed ? 'claimed' : ''} ${ready ? 'ready' : ''} ${i === FEST_TRACK.length - 1 ? 'final' : ''}`}>
              <span className="fest-num">{m.pts}</span>
              <RewardChips r={m.r} />
              {claimed ? (
                <Icon name="check" size={26} />
              ) : (
                <Btn small color={ready ? 'pink' : 'grey'} disabled={!ready} onClick={() => (act(claimFest, i), sfx('task'))}>
                  Klaim
                </Btn>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------ achievements
export function AchievementsModal({ onClose }) {
  const { state, act } = useGameCtx();
  return (
    <Modal title="Prestasi" onClose={onClose}>
      <div className="ach-list">
        {ACHIEVEMENTS.map((a) => {
          const st = achState(state, a);
          return (
            <div key={a.id} className={`ach ${st.done ? 'done' : ''} ${st.ready ? 'ready' : ''}`}>
              <div className="ach-cups">
                {a.targets.map((_, i) => (
                  <Icon key={i} name="trophy" size={18} className={i < st.tier ? 'won' : 'dim'} />
                ))}
              </div>
              <div className="ach-main">
                <b>{a.label}</b>
                <small>{st.done ? 'Semua tingkat selesai!' : a.desc(st.target)}</small>
                {!st.done && (
                  <div className="quest-bar">
                    <Bar value={Math.min(st.val, st.target)} max={st.target} />
                    <span>
                      {Math.min(st.val, st.target)}/{st.target}
                    </span>
                  </div>
                )}
              </div>
              {!st.done && (
                <Btn small color={st.ready ? 'green' : 'grey'} disabled={!st.ready} onClick={() => (act(claimAch, a.id), sfx('task'))}>
                  <Icon name="gem" size={14} />
                  {ACH_GEMS[st.tier]}
                </Btn>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------------ backup
export function BackupPanel({ onRestored }) {
  const { ref } = useGameCtx();
  const [mode, setMode] = useState(null);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');

  const code = () => {
    const json = JSON.stringify(ref.current);
    return 'ZCC1:' + btoa(unescape(encodeURIComponent(json)));
  };

  const copy = async () => {
    const c = code();
    setText(c);
    setMode('export');
    try {
      await navigator.clipboard.writeText(c);
      setMsg('Kode disalin! Simpan di catatan atau kirim ke perangkat lain.');
    } catch {
      setMsg('Salin kode di bawah ini secara manual.');
    }
  };

  const restore = () => {
    try {
      const raw = text.trim();
      if (!raw.startsWith('ZCC1:')) throw new Error('bad');
      const s = JSON.parse(decodeURIComponent(escape(atob(raw.slice(5)))));
      if (s?.v !== 2 || !Array.isArray(s.board)) throw new Error('bad');
      saveGame(s);
      sfx('task');
      onRestored();
    } catch {
      sfx('error');
      setMsg('Kode tidak valid. Pastikan seluruh kode tersalin.');
    }
  };

  return (
    <div className="backup">
      <b>Pindah perangkat</b>
      <p className="muted small">Progres tersimpan di perangkat ini. Pakai kode cadangan untuk memindahkannya ke HP atau komputer lain.</p>
      <div className="backup-btns">
        <Btn small color="blue" onClick={copy}>
          Salin kode
        </Btn>
        <Btn small color="orange" onClick={() => (setMode('import'), setText(''), setMsg(''))}>
          Pulihkan
        </Btn>
      </div>
      {mode && (
        <>
          <textarea
            className="backup-text"
            value={text}
            readOnly={mode === 'export'}
            placeholder="Tempel kode cadangan di sini…"
            onChange={(e) => setText(e.target.value)}
            onFocus={(e) => mode === 'export' && e.target.select()}
          />
          {mode === 'import' && (
            <Btn small color="green" disabled={!text.trim()} onClick={restore}>
              Pulihkan progres
            </Btn>
          )}
        </>
      )}
      {msg && <p className="small center backup-msg">{msg}</p>}
    </div>
  );
}
