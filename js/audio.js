(function(){
  'use strict';
  let ctx,master,sfxBus,muted=false,region='village',active=0,fadeToken=0;
  const MUSIC_VOLUME=.27,FADE_MS=3200;
  const musicFiles={
    village:'the-britons.mp3',
    forest:'magic-forest.mp3',
    river:'lord-of-the-land.mp3',
    mountain:'call-to-adventure.mp3',
    marsh:'private-reflection.mp3',
    goblin:'division.mp3',
    ruins:'rising-game.mp3'
  };
  const names={village:'Stari trg pod Jelšo',forest:'Čarovnija Belega gaja',river:'Pot ob Šepetalki',mountain:'Klic Sivih zob',marsh:'Sanje pod močvirjem',goblin:'Prepir za tri barve',ruins:'Prebujenje starega kralja'};
  const players=[new Audio(),new Audio()];
  for(const p of players){p.loop=true;p.preload='auto';p.volume=0}
  function init(){
    if(!ctx){ctx=new(window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();sfxBus=ctx.createGain();master.gain.value=.34;sfxBus.gain.value=.58;sfxBus.connect(master);master.connect(ctx.destination);startTrack(musicFiles[region],false)}
    else if(ctx.state==='suspended')ctx.resume();
  }
  function startTrack(file,crossfade=true){
    const incoming=players[1-active],outgoing=players[active],token=++fadeToken;
    if(!incoming.src.endsWith('/'+file)){incoming.src='assets/audio/'+file;incoming.currentTime=0}
    incoming.volume=crossfade?0:(muted?0:MUSIC_VOLUME);incoming.play().catch(()=>{});
    if(!crossfade){outgoing.pause();active=1-active;return}
    const started=performance.now();
    function fade(now){if(token!==fadeToken)return;const p=Math.min(1,(now-started)/FADE_MS),soft=p*p*(3-2*p),target=muted?0:MUSIC_VOLUME;incoming.volume=target*soft;outgoing.volume=target*(1-soft);if(p<1)requestAnimationFrame(fade);else{outgoing.pause();outgoing.currentTime=0;active=1-active}}
    requestAnimationFrame(fade);
  }
  function env(time,duration,volume){const g=ctx.createGain();g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(volume,time+.018);g.gain.exponentialRampToValueAtTime(.0001,time+duration);g.connect(sfxBus);return g}
  function tone(freq,duration,type='sine',volume=.18,slide=0){init();const now=ctx.currentTime,o=ctx.createOscillator(),g=env(now,duration,volume);o.type=type;o.frequency.setValueAtTime(freq,now);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(35,freq+slide),now+duration);o.connect(g);o.start();o.stop(now+duration+.02)}
  function noise(duration=.08,volume=.16){init();const n=Math.floor(ctx.sampleRate*duration),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=ctx.createBufferSource(),g=env(ctx.currentTime,duration,volume);s.buffer=b;s.connect(g);s.start()}
  const sounds={step:()=>tone(76,.035,'sine',.045,-18),chop:()=>{noise(.1,.25);tone(115,.11,'square',.13,-48)},mine:()=>{tone(720,.08,'square',.14,-360);setTimeout(()=>tone(390,.11,'triangle',.08,-170),50)},pickup:()=>{tone(450,.08,'sine',.12,210);setTimeout(()=>tone(720,.11,'sine',.09,150),70)},sword:()=>{noise(.055,.1);tone(260,.09,'sawtooth',.07,280)},hit:()=>{noise(.085,.3);tone(92,.09,'square',.2,-38)},goblin:()=>tone(145,.12,'square',.1,-30),hurt:()=>tone(175,.2,'sawtooth',.17,-105),heal:()=>[0,80,160].forEach((t,i)=>setTimeout(()=>tone(420+i*125,.14,'sine',.09,75),t)),quest:()=>[0,120,250].forEach((t,i)=>setTimeout(()=>tone([392,523,659][i],.3,'triangle',.1,28),t)),talk:()=>tone(255+Math.random()*48,.045,'square',.025,-12),level:()=>[0,90,180,300].forEach((t,i)=>setTimeout(()=>tone([330,440,550,740][i],.24,'triangle',.1,45),t)),ui:()=>tone(520,.06,'sine',.06,80)};
  window.GameAudio={init,play(name){if(!muted&&sounds[name])sounds[name]()},setRegion(next){if(!musicFiles[next]||next===region)return names[region];region=next;if(ctx)startTrack(musicFiles[region],true);return names[region]},trackName(){return names[region]},toggle(){init();muted=!muted;fadeToken++;for(const p of players)p.volume=muted?0:(p===players[active]?MUSIC_VOLUME:0);if(!muted)players[active].play().catch(()=>{});return !muted}};
})();
