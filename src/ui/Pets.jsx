import { useState } from 'react';
import { useGameCtx } from '../game/useGame';
import { Modal, Btn, Icon, Bar } from './common';
import { ItemArt } from '../art/ItemArt';
import { item } from '../game/items';
import { PETS, MAX_HEARTS, heartRange, allPhotos, heartsFor } from '../game/pets';
import { AREAS } from '../game/areas';
import { feedPet, findPetItem } from '../game/engine';
import { sfx } from '../game/audio';

function Hearts({ n, size = 18 }) {
  return (
    <span className="hearts">
      {Array.from({ length: MAX_HEARTS }, (_, i) => (
        <Icon key={i} name={i < n ? 'heart' : 'heartEmpty'} size={size} />
      ))}
    </span>
  );
}

function joinArea(cat) {
  const a = AREAS.find((x) => x.reward?.cat === cat);
  return a ? a.name : '';
}

export function anyPetReady(state) {
  return state.residents.some((c) => PETS[c] && state.pets?.[c]?.want && findPetItem(state, c));
}

export function PetsModal({ onClose, onAlbum }) {
  const { state, act } = useGameCtx();
  const [bounce, setBounce] = useState(null);
  return (
    <Modal title="Teman Kucing" onClose={onClose} className="pets">
      <p className="muted center">Beri camilan favorit agar mereka makin sayang. Setiap hati baru membuka foto di album!</p>
      {Object.entries(PETS).map(([cat, p]) => {
        const joined = state.residents.includes(cat);
        if (!joined) {
          return (
            <div key={cat} className="pet-card locked">
              <div className="pet-img">
                <img src={p.img} alt="" draggable="false" />
              </div>
              <div className="pet-info">
                <b>{p.name}</b>
                <span className="muted">Bergabung setelah {joinArea(cat)} selesai direnovasi.</span>
              </div>
              <Icon name="lock" size={28} />
            </div>
          );
        }
        const pet = state.pets?.[cat] || { pts: 0 };
        const { h, lo, hi } = heartRange(pet.pts);
        const maxed = h >= MAX_HEARTS;
        const have = pet.want && findPetItem(state, cat);
        return (
          <div key={cat} className="pet-card">
            <div className={`pet-img ${bounce === cat ? 'pet-bounce' : ''}`}>
              <img src={p.img} alt={p.name} draggable="false" />
            </div>
            <div className="pet-info">
              <b>{p.name}</b>
              <Hearts n={h} />
              {!maxed && (
                <div className="pet-bar">
                  <Bar value={pet.pts - lo} max={hi - lo} className="bar-pink" />
                </div>
              )}
              <small className="pet-bio">{p.bio}</small>
            </div>
            <div className="pet-want">
              {pet.want && (
                <>
                  <small>Ingin:</small>
                  <div className={`pet-want-art ${have ? 'have' : ''}`}>
                    <ItemArt id={pet.want} />
                    {have && <Icon name="check" size={16} className="order-check" />}
                  </div>
                  <small className="pet-want-name">{item(pet.want).name}</small>
                  <Btn
                    small
                    color={have ? 'pink' : 'grey'}
                    disabled={!have}
                    onClick={() => {
                      if (act(feedPet, cat)) {
                        sfx('meow');
                        setBounce(cat);
                        setTimeout(() => setBounce(null), 700);
                      }
                    }}
                  >
                    Beri
                  </Btn>
                </>
              )}
            </div>
          </div>
        );
      })}
      <Btn color="blue" onClick={onAlbum}>
        <Icon name="photo" size={22} /> Album Foto
      </Btn>
    </Modal>
  );
}

export function AlbumModal({ onClose }) {
  const { state } = useGameCtx();
  const [open, setOpen] = useState(null);
  const photos = allPhotos();
  const unlocked = (ph) => heartsFor(state.pets?.[ph.cat]?.pts || 0) >= ph.hearts;
  const count = photos.filter(unlocked).length;
  return (
    <Modal title="Album Foto" onClose={onClose} className="album">
      <p className="muted center">
        {count}/{photos.length} foto terbuka
      </p>
      <div className="album-grid">
        {photos.map((ph, i) => {
          const u = unlocked(ph);
          return (
            <button type="button" key={i} className={`polaroid ${u ? '' : 'locked'}`} style={{ '--tilt': `${((i * 37) % 9) - 4}deg` }} disabled={!u} onClick={() => (sfx('tap'), setOpen(ph))}>
              <div className="polaroid-img" style={{ backgroundImage: `url(${ph.src})` }} />
              {u ? (
                <small>{ph.caption}</small>
              ) : (
                <small className="polaroid-lock">
                  {PETS[ph.cat].name} <Icon name="heart" size={13} />
                  {ph.hearts}
                </small>
              )}
            </button>
          );
        })}
      </div>
      {open && (
        <div className="photo-view" onClick={() => setOpen(null)}>
          <div className="polaroid big">
            <img src={open.src} alt={open.caption} />
            <small>{open.caption}</small>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function HeartReward({ r, onDone }) {
  const p = PETS[r.cat];
  return (
    <div className="modal-back levelup-back" onClick={onDone}>
      <div className="levelup heart-reward" onClick={(e) => e.stopPropagation()}>
        <div className="rays pink" />
        <img className="heart-cat" src={p.img} alt={p.name} />
        <h2>
          {p.name} makin sayang!
        </h2>
        <Hearts n={r.hearts} size={26} />
        {r.photo && (
          <div className="polaroid reveal">
            <img src={r.photo.src} alt={r.photo.caption} />
            <small>{r.photo.caption}</small>
          </div>
        )}
        <div className="levelup-rewards">
          <span className="chip">
            <Icon name="gem" size={18} />
            {r.gems}
          </span>
        </div>
        <Btn color="green" className="big" onClick={onDone}>
          {r.photo ? 'Simpan ke Album' : 'Yay!'}
        </Btn>
      </div>
    </div>
  );
}
