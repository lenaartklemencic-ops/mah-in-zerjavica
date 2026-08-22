(function(){
  'use strict';
  let ctx,master,musicBus,sfxBus,muted=false,timer,nextBeat=0,step=0,region='village';
  const bgm=new Audio('assets/audio/village-square.ogg');bgm.loop=false;bgm.volume=.34;bgm.preload='auto';
  const musicFiles={village:['village-square.ogg','through-sea.ogg'],forest:['through-sea.ogg','village-square.ogg'],river:['through-sea.ogg','village-square.ogg'],mountain:['through-fire.ogg','through-sea.ogg'],marsh:['through-sea.ogg','through-fire.ogg'],goblin:['through-fire.ogg','village-square.ogg'],ruins:['through-fire.ogg','through-sea.ogg']};
  let songIndex=0;
  const names={village:'Veter nad Jelšami',forest:'Šumenje Belega gaja',river:'Tok stare reke',mountain:'Prepih Sivih zob',marsh:'Noč nad močvirjem',goblin:'Oddaljeni goblinski tabor',ruins:'Tišina Perunovih ruševin'};
  const tracks={
    village:{bpm:104,key:57,lead:[0,4,7,4,2,5,9,7,0,4,7,11,9,7,4,2],bass:[0,null,0,null,5,null,7,null,0,null,0,null,5,null,7,null]},
    forest:{bpm:92,key:55,lead:[0,null,3,5,7,5,3,null,0,3,7,10,7,5,3,null],bass:[0,null,null,0,5,null,null,5,3,null,null,3,7,null,5,null]},
    river:{bpm:86,key:60,lead:[0,2,7,null,5,2,0,null,2,5,9,7,5,2,0,null],bass:[0,null,5,null,0,null,7,null,0,null,5,null,7,null,5,null]},
    mountain:{bpm:78,key:50,lead:[0,null,7,5,3,null,10,7,0,null,3,5,7,10,7,null],bass:[0,null,null,0,3,null,null,3,5,null,null,5,7,null,5,null]},
    marsh:{bpm:72,key:53,lead:[0,null,1,5,null,4,1,null,0,6,5,null,1,0,null,-2],bass:[0,null,null,0,1,null,null,1,5,null,null,5,1,null,0,null]},
    goblin:{bpm:126,key:55,lead:[0,0,3,5,7,5,3,0,7,7,10,8,7,5,3,2],bass:[0,null,0,null,3,null,5,null,0,null,7,null,5,null,3,null]},
    ruins:{bpm:68,key:48,lead:[0,null,3,null,7,6,3,null,1,null,5,null,8,7,5,null],bass:[0,null,null,0,1,null,null,1,5,null,null,5,3,null,1,null]}
  };
  function init(){
    if(ctx){if(ctx.state==='suspended')ctx.resume();return}
    ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();musicBus=ctx.createGain();sfxBus=ctx.createGain();master.gain.value=.3;musicBus.gain.value=0;sfxBus.gain.value=.55;musicBus.connect(master);sfxBus.connect(master);master.connect(ctx.destination);nextBeat=ctx.currentTime+.08;bgm.play().catch(()=>{});
  }
  function playSong(reset=false){const list=musicFiles[region]||musicFiles.village;if(reset)songIndex=0;const file=list[songIndex%list.length];songIndex=(songIndex+1)%list.length;if(!bgm.src.endsWith(file))bgm.src='assets/audio/'+file;if(!muted)bgm.play().catch(()=>{})}
  bgm.addEventListener('ended',()=>playSong());
  function env(time,duration,volume,bus){const g=ctx.createGain();g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(volume,time+.025);g.gain.exponentialRampToValueAtTime(.0001,time+duration);g.connect(bus);return g}
  function noteFreq(midi){return 440*Math.pow(2,(midi-69)/12)}
  function pluck(midi,time,duration=.28,volume=.1,type='triangle',bus=musicBus){const o=ctx.createOscillator(),g=env(time,duration,volume,bus);o.type=type;o.frequency.setValueAtTime(noteFreq(midi),time);o.detune.setValueAtTime(type==='triangle'?3:0,time);o.connect(g);o.start(time);o.stop(time+duration+.03)}
  function fiddle(midi,time,duration=.42,volume=.055){const g=env(time,duration,volume,musicBus),filter=ctx.createBiquadFilter(),v=ctx.createOscillator(),vg=ctx.createGain();filter.type='lowpass';filter.frequency.value=2400;filter.Q.value=1.4;v.frequency.value=5.3;vg.gain.value=7;v.connect(vg);for(const detune of[-5,4]){const o=ctx.createOscillator();o.type='sawtooth';o.frequency.value=noteFreq(midi);o.detune.value=detune;vg.connect(o.detune);o.connect(filter);o.start(time);o.stop(time+duration+.04)}filter.connect(g);v.start(time);v.stop(time+duration+.04)}
  function drum(time,strong){const o=ctx.createOscillator(),g=env(time,.08,strong?.09:.045,musicBus);o.type='sine';o.frequency.setValueAtTime(strong?95:135,time);o.frequency.exponentialRampToValueAtTime(45,time+.07);o.connect(g);o.start(time);o.stop(time+.1)}
  function schedule(){if(!ctx||muted)return;const t=tracks[region];const beat=60/t.bpm/2;while(nextBeat<ctx.currentTime+.35){const i=step%16,n=t.lead[i],b=t.bass[i];if(n!==null)fiddle(t.key+n,nextBeat,beat*1.72,region==='goblin'?.048:.058);if(b!==null)pluck(t.key-12+b,nextBeat,beat*1.8,.052,'sine');if(i%4===0)drum(nextBeat,i%8===0);if(i%2===1)pluck(t.key+12+(i%4?7:4),nextBeat,beat*.48,region==='mountain'?.022:.014,region==='goblin'?'square':'triangle');nextBeat+=beat;step++}}
  function tone(freq,duration,type='sine',volume=.18,slide=0){init();const now=ctx.currentTime,o=ctx.createOscillator(),g=env(now,duration,volume,sfxBus);o.type=type;o.frequency.setValueAtTime(freq,now);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(35,freq+slide),now+duration);o.connect(g);o.start();o.stop(now+duration+.02)}
  function noise(duration=.08,volume=.16){init();const n=Math.floor(ctx.sampleRate*duration),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=ctx.createBufferSource(),g=env(ctx.currentTime,duration,volume,sfxBus);s.buffer=b;s.connect(g);s.start()}
  const sounds={step:()=>tone(76,.035,'sine',.045,-18),chop:()=>{noise(.1,.25);tone(115,.11,'square',.13,-48)},mine:()=>{tone(720,.08,'square',.14,-360);setTimeout(()=>tone(390,.11,'triangle',.08,-170),50)},pickup:()=>{tone(450,.08,'sine',.12,210);setTimeout(()=>tone(720,.11,'sine',.09,150),70)},sword:()=>{noise(.055,.1);tone(260,.09,'sawtooth',.07,280)},hit:()=>{noise(.085,.3);tone(92,.09,'square',.2,-38)},goblin:()=>tone(145,.12,'square',.1,-30),hurt:()=>tone(175,.2,'sawtooth',.17,-105),heal:()=>[0,80,160].forEach((t,i)=>setTimeout(()=>tone(420+i*125,.14,'sine',.09,75),t)),quest:()=>[0,120,250].forEach((t,i)=>setTimeout(()=>tone([392,523,659][i],.3,'triangle',.1,28),t)),talk:()=>tone(255+Math.random()*48,.045,'square',.025,-12),level:()=>[0,90,180,300].forEach((t,i)=>setTimeout(()=>tone([330,440,550,740][i],.24,'triangle',.1,45),t)),ui:()=>tone(520,.06,'sine',.06,80)};
  window.GameAudio={init,play(name){if(!muted&&sounds[name])sounds[name]()},setRegion(next){if(!tracks[next]||next===region)return names[region];region=next;step=0;if(ctx)nextBeat=ctx.currentTime+.05;songIndex=0;playSong(true);return names[region]},trackName(){return names[region]},toggle(){init();muted=!muted;master.gain.setTargetAtTime(muted?0:.3,ctx.currentTime,.03);if(muted)bgm.pause();else bgm.play().catch(()=>{});return !muted}};
})();
