import { useGameCtx } from '../game/useGame';
import { Modal, Btn, Icon, Bar, RewardChips } from './common';
import { CatArt } from '../art/CatArt';
import { CUSTOMERS } from '../game/config';
import { REP_TIERS, repTier } from '../game/guestbook';
import { claimRep } from '../game/engine';
import { sfx } from '../game/audio';

export function repReady(state) {
  return REP_TIERS.some((t, i) => t.r && state.stats.served >= t.at && !(state.repClaimed || []).includes(i));
}

function ago(t) {
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 1) return 'baru saja';
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export function GuestbookModal({ onClose }) {
  const { state, act } = useGameCtx();
  const served = state.stats.served;
  const ti = repTier(served);
  const next = REP_TIERS[ti + 1];
  const reviews = state.reviews || [];
  const avg = reviews.length ? reviews.reduce((n, r) => n + r.stars, 0) / reviews.length : 5;
  return (
    <Modal title="Buku Tamu" onClose={onClose} className="guestbook">
      <div className="rep-card">
        <div className="rep-badge">
          <Icon name="star" size={46} />
          <b>{ti + 1}</b>
        </div>
        <div className="rep-main">
          <b>{REP_TIERS[ti].title}</b>
          <small>
            ★ {avg.toFixed(1)} · {served} pesanan disajikan
          </small>
          {next && (
            <>
              <Bar value={served - REP_TIERS[ti].at} max={next.at - REP_TIERS[ti].at} />
              <small>
                {next.at - served} pesanan lagi menuju “{next.title}”
              </small>
            </>
          )}
        </div>
      </div>
      <div className="rep-track">
        {REP_TIERS.map((t, i) =>
          t.r ? (
            <div key={i} className={`rep-step ${served >= t.at ? 'reached' : ''}`}>
              <small>{t.at}</small>
              <RewardChips r={t.r} />
              {(state.repClaimed || []).includes(i) ? (
                <Icon name="check" size={22} />
              ) : (
                <Btn small color={served >= t.at ? 'green' : 'grey'} disabled={served < t.at} onClick={() => (act(claimRep, i), sfx('task'))}>
                  Klaim
                </Btn>
              )}
            </div>
          ) : null,
        )}
      </div>
      <h4>Ulasan Pelanggan</h4>
      {reviews.length === 0 && <p className="muted center">Belum ada ulasan. Sajikan pesanan pertama!</p>}
      <div className="reviews">
        {reviews.map((r, i) => (
          <div key={i} className={`review ${r.vip ? 'vip' : ''}`}>
            <span className="review-cat">
              <CatArt id={r.cat} mood="happy" />
            </span>
            <div>
              <b>
                {CUSTOMERS.find((c) => c.id === r.cat)?.name}
                {r.vip && <Icon name="crown" size={14} />} <span className="stars">{'★'.repeat(r.stars)}</span>
              </b>
              <p>{r.text}</p>
              <small>{ago(r.t)}</small>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
