(function(){
  'use strict';
  let ctx,master,musicBus,sfxBus,muted=false,timer,nextBeat=0,step=0,region='village';
  const names={village:'Jutro v Jelšah',forest:'Pot pod zelenimi vejami',river:'Reka, ki pomni',mountain:'Kamniti veter',marsh:'Luči nad močvirjem',goblin:'Marš krivih škornjev',ruins:'Pepel starega kralja'};
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
    ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();musicBus=ctx.createGain();sfxBus=ctx.createGain();master.gain.value=.3;musicBus.gain.value=.22;sfxBus.gain.value=.55;musicBus.connect(master);sfxBus.connect(master);master.connect(ctx.destination);nextBeat=ctx.currentTime+.08;timer=setInterval(schedule,90);schedule();
  }
  function env(time,duration,volume,bus){const g=ctx.createGain();g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(volume,time+.025);g.gain.exponentialRampToValueAtTime(.0001,time+duration);g.connect(bus);return g}
  function noteFreq(midi){return 440*Math.pow(2,(midi-69)/12)}
  function pluck(midi,time,duration=.28,volume=.1,type='triangle',bus=musicBus){const o=ctx.createOscillator(),g=env(time,duration,volume,bus);o.type=type;o.frequency.setValueAtTime(noteFreq(midi),time);o.detune.setValueAtTime(type==='triangle'?3:0,time);o.connect(g);o.start(time);o.stop(time+duration+.03)}
  function drum(time,strong){const o=ctx.createOscillator(),g=env(time,.08,strong?.09:.045,musicBus);o.type='sine';o.frequency.setValueAtTime(strong?95:135,time);o.frequency.exponentialRampToValueAtTime(45,time+.07);o.connect(g);o.start(time);o.stop(time+.1)}
  function schedule(){if(!ctx||muted)return;const t=tracks[region];const beat=60/t.bpm/2;while(nextBeat<ctx.currentTime+.35){const i=step%16,n=t.lead[i],b=t.bass[i];if(n!==null)pluck(t.key+n,nextBeat,beat*1.65,.07,region==='goblin'?'square':'triangle');if(b!==null)pluck(t.key-12+b,nextBeat,beat*1.8,.06,'sine');if(i%4===0)drum(nextBeat,i%8===0);if((region==='village'||region==='goblin')&&i%2===1)pluck(t.key+12+(i%4?7:4),nextBeat,beat*.45,.018,'square');nextBeat+=beat;step++}}
  function tone(freq,duration,type='sine',volume=.18,slide=0){init();const now=ctx.currentTime,o=ctx.createOscillator(),g=env(now,duration,volume,sfxBus);o.type=type;o.frequency.setValueAtTime(freq,now);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(35,freq+slide),now+duration);o.connect(g);o.start();o.stop(now+duration+.02)}
  function noise(duration=.08,volume=.16){init();const n=Math.floor(ctx.sampleRate*duration),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=ctx.createBufferSource(),g=env(ctx.currentTime,duration,volume,sfxBus);s.buffer=b;s.connect(g);s.start()}
  const sounds={step:()=>tone(76,.035,'sine',.045,-18),chop:()=>{noise(.1,.25);tone(115,.11,'square',.13,-48)},mine:()=>{tone(720,.08,'square',.14,-360);setTimeout(()=>tone(390,.11,'triangle',.08,-170),50)},pickup:()=>{tone(450,.08,'sine',.12,210);setTimeout(()=>tone(720,.11,'sine',.09,150),70)},sword:()=>{noise(.07,.14);tone(230,.12,'sawtooth',.11,300)},goblin:()=>tone(145,.12,'square',.1,-30),hurt:()=>tone(175,.2,'sawtooth',.17,-105),heal:()=>[0,80,160].forEach((t,i)=>setTimeout(()=>tone(420+i*125,.14,'sine',.09,75),t)),quest:()=>[0,120,250].forEach((t,i)=>setTimeout(()=>tone([392,523,659][i],.3,'triangle',.1,28),t)),talk:()=>tone(255+Math.random()*48,.045,'square',.025,-12),level:()=>[0,90,180,300].forEach((t,i)=>setTimeout(()=>tone([330,440,550,740][i],.24,'triangle',.1,45),t)),ui:()=>tone(520,.06,'sine',.06,80)};
  window.GameAudio={init,play(name){if(!muted&&sounds[name])sounds[name]()},setRegion(next){if(!tracks[next]||next===region)return names[region];region=next;step=0;if(ctx)nextBeat=ctx.currentTime+.05;return names[region]},trackName(){return names[region]},toggle(){init();muted=!muted;master.gain.setTargetAtTime(muted?0:.3,ctx.currentTime,.03);return !muted}};
})();
