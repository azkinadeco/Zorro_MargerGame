import { useCallback, useEffect, useRef, useState } from 'react';
import { GameProvider, useGameState, bus, hasSave } from './game/useGame';
import { newGame, doTask, canClaimDaily } from './game/engine';
import { AREAS } from './game/areas';
import { item } from './game/items';
import { sfx, vibrate, configureAudio, unlockAudio } from './game/audio';
import { TopBar } from './ui/TopBar';
import { BoardScreen, markAllSeen } from './ui/BoardScreen';
import { CafeScreen, TaskSheet } from './ui/CafeScreen';
import { StorageModal, QuestsModal, DailyModal, CodexModal, ShopModal, EnergyModal, LevelUpModal, LevelInfoModal, TasksModal, SettingsModal } from './ui/Modals';
import { Dialogue, Tutorial, FX } from './ui/Overlays';
import { PetsModal, AlbumModal, HeartReward } from './ui/Pets';
import { Btn } from './ui/common';

const MODALS = ['storage', 'quests', 'daily', 'codex', 'shop', 'energy', 'level', 'tasks', 'settings', 'pets', 'album'];

function Title({ onStart, returning }) {
  return (
    <div className="title-screen">
      <div className="title-bg" />
      <div className="title-content">
        <img className="title-logo" src="/ui/logo_zorro_merge_cats.png" alt="Zorro Merge Cats" />
        <p className="title-sub">Kafe Kucing · Gabung · Sajikan · Renovasi</p>
        <img className="title-cat" src="/cats/zoro_transparent.png" alt="" />
        <Btn color="green" className="big title-btn" onClick={onStart}>
          {returning ? 'Lanjutkan' : 'Mulai Main'}
        </Btn>
      </div>
    </div>
  );
}

function Game({ onReset }) {
  const game = useGameState();
  const { state, act, ref } = game;
  const [screen, setScreen] = useState('title');
  const [modal, setModal] = useState(null);
  const [taskSheet, setTaskSheet] = useState(null);
  const [dialogues, setDialogues] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [viewArea, setViewArea] = useState(state.areaIdx);
  const dailyShown = useRef(false);
  const returning = useRef(hasSave() && state.tut > 0);

  useEffect(() => markAllSeen(state.board), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => configureAudio(state.settings), [state.settings]);

  const say = useCallback((lines, after) => setDialogues((q) => [...q, { lines, after }]), []);

  // sounds, haptics and story reactions to engine events
  useEffect(
    () =>
      bus.on(({ t, d }) => {
        const vibe = ref.current.settings.vibe;
        switch (t) {
          case 'spawn':
            sfx('spawn');
            vibrate(vibe, 8);
            break;
          case 'merge':
            sfx('merge', item(d.id).tier);
            vibrate(vibe, 15);
            break;
          case 'move':
            sfx('move');
            break;
          case 'unbox':
            sfx('unbox');
            break;
          case 'collect':
          case 'chestOpen':
          case 'gift':
          case 'retrieve':
          case 'store':
          case 'bubble':
          case 'popBubble':
          case 'freeWeb':
            sfx('pop');
            break;
          case 'sell':
            sfx('coin');
            break;
          case 'fail':
          case 'needGems':
          case 'needCoins':
            sfx('error');
            break;
          case 'needEnergy':
            sfx('error');
            setModal('energy');
            break;
          case 'task':
            sfx('task');
            vibrate(vibe, 30);
            setTimeout(() => say([d.task.line]), 900);
            break;
          case 'feed':
            sfx('pop');
            break;
          case 'petHeart':
            setTimeout(() => {
              sfx('levelUp');
              setHearts((q) => [...q, d]);
            }, 500);
            break;
          case 'swapOrder':
            sfx('whoosh');
            break;
          case 'areaComplete':
            setTimeout(() => {
              say(d.area.outro, () => {
                setViewArea(ref.current.areaIdx);
              });
            }, 1800);
            break;
          default:
        }
      }),
    [ref, say],
  );

  // level-up fanfare
  const pendingLen = state.pendingLevel.length;
  useEffect(() => {
    if (pendingLen > 0 && screen !== 'title') sfx('levelUp');
  }, [pendingLen, screen]);

  // area intro the first time a room is opened
  const area = AREAS[Math.min(viewArea, state.areaIdx)];
  useEffect(() => {
    if (screen !== 'cafe' || dialogues.length) return;
    const key = 'intro_' + area.id;
    if (state.seen[key]) return;
    if (area.id !== 'hall' && state.tut < 99) return;
    act((s) => {
      s.seen[key] = 1;
    });
    say(area.intro, () => {
      if (area.id === 'hall') act((s) => void (s.tut = Math.max(s.tut, 1)));
    });
  }, [screen, area, state.seen, state.tut, dialogues.length, act, say]);

  // one-time hint about cobwebs and boxes once the basics are learned
  useEffect(() => {
    if (screen !== 'board' || state.tut < 4 || state.seen.hint_web || dialogues.length || state.pendingLevel.length) return;
    if (!state.board.some((c) => c?.st === 'web')) return;
    const id = setTimeout(() => {
      act((s) => void (s.seen.hint_web = 1));
      say([
        ['nina', 'Lihat item yang terjebak sarang laba-laba itu? Seret item yang sama ke atasnya untuk membebaskannya!'],
        ['zorro', 'Meong! (Kotak kardus di atasnya akan terbuka kalau kamu menggabungkan item tepat di sebelahnya.)'],
      ]);
    }, 1200);
    return () => clearTimeout(id);
  }, [screen, state.tut, state.seen.hint_web, state.board, state.pendingLevel.length, dialogues.length, act, say]);

  // introduce the resident-cat feature once the player is settled in
  useEffect(() => {
    if (screen !== 'cafe' || state.tut < 99 || state.seen.hint_pets || dialogues.length || modal || state.stats.served < 6) return;
    const id = setTimeout(() => {
      act((s) => void (s.seen.hint_pets = 1));
      say([
        ['zorro', 'Meooong… (Perutku keroncongan.)'],
        ['nina', 'Zorro lapar! Ketuk tombol kucing di kiri untuk memberinya camilan favorit. Makin sayang, makin banyak foto kenangan yang terbuka.'],
      ]);
    }, 900);
    return () => clearTimeout(id);
  }, [screen, state.tut, state.seen.hint_pets, state.stats.served, dialogues.length, modal, act, say]);

  // tutorial completion story beat
  useEffect(() => {
    if (state.tut === 6 && !dialogues.length) {
      setTimeout(
        () =>
          say(
            [
              ['nina', 'Hebat! Begitulah caranya: sajikan pesanan, kumpulkan koin, lalu percantik kafe.'],
              ['zorro', 'Meong! (Jangan lupa cek misi harian dan hadiah harian, ya!)'],
            ],
            () => act((s) => void (s.tut = 99)),
          ),
        2600,
      );
      act((s) => void (s.tut = 7));
    }
  }, [state.tut, dialogues.length, act, say]);

  // daily reward popup once per session
  useEffect(() => {
    if (screen === 'cafe' && state.tut >= 99 && !dialogues.length && !modal && !dailyShown.current && canClaimDaily(state)) {
      dailyShown.current = true;
      const id = setTimeout(() => setModal('daily'), 600);
      return () => clearTimeout(id);
    }
  }, [screen, state, dialogues.length, modal]);

  const nav = (to) => {
    sfx('tap');
    if (to === 'board' || to === 'cafe') {
      sfx('whoosh');
      setModal(null);
      setTaskSheet(null);
      if (to === 'board' && state.tut === 1) act((s) => void (s.tut = 2));
      if (to === 'cafe' && state.tut === 4 && state.coins >= AREAS[0].tasks[0].cost) act((s) => void (s.tut = 5));
      if (to === 'cafe') setViewArea(state.areaIdx);
      setScreen(to);
    } else if (MODALS.includes(to)) setModal(to);
  };

  const start = () => {
    unlockAudio();
    sfx('task');
    setScreen(state.tut >= 2 && state.tut < 5 ? 'board' : 'cafe');
  };

  // ------------------------------------------------------------ tutorial
  let tut = null;
  if (!dialogues.length && !modal && !state.pendingLevel.length) {
    const s = state.tut;
    if (screen === 'cafe' && s === 1) tut = { target: '[data-tut="play"]', text: 'Ayo mulai! Ketuk Main untuk melayani pelanggan pertama.' };
    if (screen === 'board' && s === 2) {
      const beans = [];
      state.board.forEach((c, i) => c?.id === 'coffee_1' && !c.st && beans.push(i));
      if (beans.length >= 2) tut = { target: `[data-cell="${beans[0]}"]`, dragTo: `[data-cell="${beans[1]}"]`, text: 'Seret Biji Kopi ke Biji Kopi lain untuk menggabungkannya jadi Espresso!' };
      else tut = { target: '[data-tut="gen"]', text: 'Ketuk Mesin Kopi untuk membuat Biji Kopi. Setiap ketukan memakai 1 energi.' };
    }
    if (screen === 'board' && s === 3) tut = { target: '[data-tut="serve"]', text: 'Espresso siap! Ketuk Sajikan untuk melayani Mochi.' };
    if (screen === 'board' && s === 4) {
      if (state.coins >= AREAS[0].tasks[0].cost) tut = { target: '[data-tut="home"]', text: 'Koinnya cukup! Kembali ke Kafe untuk renovasi pertama.', pos: 'bottom', soft: true };
      else tut = { text: `Layani pelanggan lain! Kumpulkan ${AREAS[0].tasks[0].cost} koin untuk renovasi pertama. (Oven membuat Tepung.)`, pos: 'bottom' };
    }
    if (screen === 'cafe' && s === 5) tut = { target: taskSheet ? '[data-tut="dotask"]' : '[data-tut="task"]', text: 'Ketuk bintang lalu tombol Renovasi untuk membersihkan lantai!' };
  }
  if (screen === 'cafe' && state.tut === 4 && state.coins < AREAS[0].tasks[0].cost && !dialogues.length && !modal) {
    tut = { target: '[data-tut="play"]', text: 'Kumpulkan koin dulu dengan menyajikan pesanan.', soft: true };
  }

  const ctx = game;
  const curDialogue = dialogues[0];

  return (
    <GameProvider value={ctx}>
      <div className="app">
        <div className="phone">
          {screen === 'title' ? (
            <Title onStart={start} returning={returning.current} />
          ) : (
            <>
              <TopBar onOpen={nav} />
              {screen === 'board' ? (
                <BoardScreen onNav={nav} tutStep={state.tut} />
              ) : (
                <CafeScreen onNav={nav} onTask={(ai, task) => setTaskSheet({ ai, task })} tutStep={state.tut} viewArea={viewArea} setViewArea={setViewArea} />
              )}
            </>
          )}

          {modal === 'storage' && <StorageModal onClose={() => setModal(null)} />}
          {modal === 'quests' && <QuestsModal onClose={() => setModal(null)} />}
          {modal === 'daily' && <DailyModal onClose={() => setModal(null)} />}
          {modal === 'codex' && <CodexModal onClose={() => setModal(null)} />}
          {modal === 'shop' && <ShopModal onClose={() => setModal(null)} />}
          {modal === 'energy' && <EnergyModal onClose={() => setModal(null)} />}
          {modal === 'level' && <LevelInfoModal onClose={() => setModal(null)} />}
          {modal === 'pets' && <PetsModal onClose={() => setModal(null)} onAlbum={() => setModal('album')} />}
          {modal === 'album' && <AlbumModal onClose={() => setModal('pets')} />}
          {modal === 'settings' && <SettingsModal onClose={() => setModal(null)} onReset={onReset} />}
          {modal === 'tasks' && (
            <TasksModal
              onClose={() => setModal(null)}
              onPick={(ai, task) => {
                setModal(null);
                setViewArea(ai);
                setTaskSheet({ ai, task });
              }}
            />
          )}
          {taskSheet && (
            <TaskSheet
              ai={taskSheet.ai}
              task={taskSheet.task}
              onClose={() => setTaskSheet(null)}
              onPlay={() => nav('board')}
              onDo={() => {
                if (act(doTask, taskSheet.ai, taskSheet.task.id)) setTaskSheet(null);
              }}
            />
          )}

          {screen !== 'title' && !curDialogue && <LevelUpModal />}
          {hearts[0] && !curDialogue && <HeartReward r={hearts[0]} onDone={() => (sfx('tap'), setHearts((q) => q.slice(1)))} />}
          {curDialogue && (
            <Dialogue
              key={dialogues.length + curDialogue.lines[0][1]}
              lines={curDialogue.lines}
              onDone={() => {
                setDialogues((q) => q.slice(1));
                curDialogue.after?.();
              }}
            />
          )}
          {tut && screen !== 'title' && <Tutorial {...tut} />}
          <FX />
        </div>
      </div>
    </GameProvider>
  );
}

export default function App() {
  const [gen, setGen] = useState(0);
  return <Game key={gen} onReset={() => setGen((g) => g + 1)} />;
}

export { newGame };
