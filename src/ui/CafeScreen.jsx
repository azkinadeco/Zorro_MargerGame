import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AREAS, RESIDENTS, taskXp } from '../game/areas';
import { useGameCtx, bus } from '../game/useGame';
import { canClaimDaily } from '../game/engine';
import { anyPetReady } from './Pets';
import { CatFigure } from '../art/CostumeArt';
import { festClaimable, FEST_LEVEL } from '../game/meta';
import { hubReady } from './Hub';
import { Icon, Btn, Bar } from './common';
import { sfx } from '../game/audio';

const IMG_RATIO = 1376 / 768;

function RoomView({ area, done, complete, justDone, onTask, tutTask, residents, onPet, outfits }) {
  const scrollRef = useRef(null);
  const [h, setH] = useState(400);
  const w = Math.round(h * IMG_RATIO);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    const measure = () => setH(el.clientHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // center the panorama when the area or size changes
  useLayoutEffect(() => {
    const el = scrollRef.current;
    el.scrollLeft = (w - el.clientWidth) / 2;
  }, [area.id, w]);

  // scroll toward the task the tutorial points at
  useEffect(() => {
    if (!tutTask) return;
    const t = area.tasks.find((x) => x.id === tutTask);
    const el = scrollRef.current;
    if (t && el) el.scrollTo({ left: (t.x / 100) * w - el.clientWidth / 2, behavior: 'smooth' });
  }, [tutTask, area, w]);

  // mouse drag-to-pan for desktop
  const pan = useRef(null);
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    pan.current = { x: e.clientX, l: scrollRef.current.scrollLeft, moved: false };
  };
  const onMove = (e) => {
    if (!pan.current) return;
    const dx = e.clientX - pan.current.x;
    if (Math.abs(dx) > 4) pan.current.moved = true;
    scrollRef.current.scrollLeft = pan.current.l - dx;
  };
  const onUp = () => setTimeout(() => (pan.current = null));

  const bg = `url(${area.bg})`;
  const cheapest = area.tasks.filter((t) => !done.includes(t.id)).sort((a, b) => a.cost - b.cost)[0];

  return (
    <div className="room-scroll" ref={scrollRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
      <div className="room" style={{ width: w, height: h }}>
        <div className={`room-dust ${complete ? 'clean' : ''}`} style={{ backgroundImage: bg }} />
        {!complete && <div className="room-grime" />}
        {!complete &&
          area.tasks
            .filter((t) => done.includes(t.id))
            .map((t) => (
              <div
                key={t.id}
                className={`room-reveal ${justDone === t.id ? 'just' : ''}`}
                style={{
                  backgroundImage: bg,
                  '--r': `${(t.r / 100) * w}px`,
                  '--x': `${t.x}%`,
                  '--y': `${t.y}%`,
                }}
              />
            ))}
        {(area.cats || [])
          .filter((c) => residents.includes(c.id) && (complete || c.id === 'zorro'))
          .map((c) => {
            const r = RESIDENTS[c.id];
            return (
              <button
                type="button"
                key={c.id}
                className="resident"
                style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%` }}
                onClick={(e) => {
                  if (pan.current?.moved) return;
                  sfx('meow');
                  const el = e.currentTarget;
                  el.classList.remove('pet');
                  void el.offsetWidth;
                  el.classList.add('pet');
                  setTimeout(() => onPet?.(), 650);
                }}
                aria-label={r.name}
              >
                <CatFigure cat={c.id} outfit={outfits?.[c.id]} />
                <span className="heart">♥</span>
              </button>
            );
          })}
        {!complete &&
          area.tasks
            .filter((t) => !done.includes(t.id))
            .map((t) => (
              <button
                type="button"
                key={t.id}
                className={`hotspot ${t === cheapest ? 'next' : ''}`}
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
                data-tut={tutTask === t.id ? 'task' : undefined}
                onClick={() => {
                  if (pan.current?.moved) return;
                  sfx('select');
                  onTask(t);
                }}
              >
                <span className="hotspot-icon">
                  <Icon name="star" size={22} />
                </span>
                <span className="hotspot-cost">
                  <Icon name="coin" size={14} />
                  {t.cost}
                </span>
              </button>
            ))}
      </div>
    </div>
  );
}

export function CafeScreen({ onNav, onTask, tutStep, viewArea, setViewArea }) {
  const { state } = useGameCtx();
  const [justDone, setJustDone] = useState(null);
  const ai = Math.min(viewArea, state.areaIdx);
  const area = AREAS[ai];
  const done = state.areas[area.id] || [];
  const complete = done.length >= area.tasks.length;

  useEffect(
    () =>
      bus.on((ev) => {
        if (ev.t === 'task') {
          setJustDone(ev.d.task.id);
          setTimeout(() => setJustDone(null), 1600);
        }
      }),
    [],
  );

  const tutTask = tutStep === 5 ? area.tasks[0].id : null;
  const dailyReady = canClaimDaily(state);
  const questReady = state.quests?.list.some((q) => q.progress >= q.target && !q.claimed);

  return (
    <div className="screen cafe-screen">
      <div className="area-head">
        <button type="button" className="area-arrow" disabled={ai <= 0} onClick={() => (sfx('tap'), setViewArea(ai - 1))} aria-label="Area sebelumnya">
          <Icon name="arrowL" size={22} />
        </button>
        <div className="area-title" role="button" onClick={() => onNav('tasks')}>
          <b>{area.name}</b>
          <div className="area-prog">
            <Bar value={done.length} max={area.tasks.length} />
            <span>
              {done.length}/{area.tasks.length}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="area-arrow"
          disabled={ai >= state.areaIdx}
          onClick={() => (sfx('tap'), setViewArea(ai + 1))}
          aria-label="Area berikutnya"
        >
          {ai >= state.areaIdx && ai < AREAS.length - 1 ? <Icon name="lock" size={20} /> : <Icon name="arrowR" size={22} />}
        </button>
      </div>

      <RoomView area={area} done={done} complete={complete} justDone={justDone} onTask={(t) => onTask(ai, t)} tutTask={tutTask} residents={state.residents} onPet={() => onNav('pets')} outfits={state.wardrobe?.outfit} />

      {complete && <div className="area-done">✨ Ruangan selesai direnovasi! ✨</div>}

      <div className="side-btns">
        <button type="button" className="round-btn" onClick={() => onNav('daily')} aria-label="Hadiah harian">
          <Icon name="calendar" size={30} />
          {dailyReady && <i className="badge dot">!</i>}
        </button>
        {state.level >= FEST_LEVEL && (
          <button type="button" className="round-btn fest-btn" data-hud="fest" onClick={() => onNav('fest')} aria-label="Festival">
            <Icon name="tent" size={32} />
            {festClaimable(state) > 0 && <i className="badge">{festClaimable(state)}</i>}
          </button>
        )}
        <button type="button" className="round-btn" onClick={() => onNav('pets')} aria-label="Teman kucing">
          <Icon name="cat" size={32} />
          {anyPetReady(state) && <i className="badge dot">!</i>}
        </button>
        <button type="button" className="round-btn hub-btn" onClick={() => onNav('hub')} aria-label="Aktivitas">
          <Icon name="menu" size={30} />
          {hubReady(state) && <i className="badge dot">!</i>}
        </button>
        <button type="button" className="round-btn" onClick={() => onNav('settings')} aria-label="Pengaturan">
          <Icon name="gear" size={30} />
        </button>
      </div>

      <nav className="cafe-bottom">
        <button type="button" className="nav-btn" onClick={() => onNav('quests')}>
          <Icon name="quest" size={30} />
          <span>Misi</span>
          {questReady && <i className="badge dot">!</i>}
        </button>
        <Btn color="green" className="play-btn" data-tut="play" onClick={() => onNav('board')}>
          <Icon name="play" size={26} /> Main
        </Btn>
        <button type="button" className="nav-btn" onClick={() => onNav('shop')}>
          <Icon name="shop" size={30} />
          <span>Toko</span>
        </button>
      </nav>
    </div>
  );
}

export function TaskSheet({ ai, task, onClose, onDo, onPlay }) {
  const { state } = useGameCtx();
  const area = AREAS[ai];
  const done = (state.areas[area.id] || []).includes(task.id);
  const short = task.cost - state.coins;
  return (
    <div className="modal-back" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-cream task-sheet" role="dialog">
        <button type="button" className="modal-close" aria-label="Tutup" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
        <div className="task-preview" style={{ backgroundImage: `url(${area.bg})`, backgroundPosition: `${task.x}% ${task.y}%` }} />
        <h3>{task.name}</h3>
        <p className="muted">{area.name}</p>
        <div className="task-rew">
          Hadiah: <Icon name="xp" size={18} /> {taskXp(task.cost)} XP
        </div>
        {done ? (
          <p>Sudah selesai ✨</p>
        ) : short > 0 ? (
          <>
            <p className="warn">
              Butuh <Icon name="coin" size={16} /> {short} koin lagi.
            </p>
            <Btn color="green" onClick={onPlay}>
              Sajikan pesanan untuk koin
            </Btn>
          </>
        ) : (
          <Btn color="green" className="big" data-tut="dotask" onClick={onDo}>
            Renovasi <Icon name="coin" size={20} /> {task.cost}
          </Btn>
        )}
      </div>
    </div>
  );
}
