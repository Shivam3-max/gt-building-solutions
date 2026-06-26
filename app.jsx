
const {useState,useEffect,useRef,useCallback,useMemo}=React;

/* ─── DATA ─────────────────────────────────────────────── */
const BRANDS=[
  {name:'Fevicol',cat:'adhesives',abbr:'FV'},
  {name:'Birla Opus',cat:'paints',abbr:'BO'},
  {name:'Asian Paints',cat:'paints',abbr:'AP'},
  {name:'3M',cat:'adhesives',abbr:'3M'},
  {name:'Nippon Paint',cat:'paints',abbr:'NP'},
  {name:'Birla White',cat:'paints',abbr:'BW'},
  {name:'Havells',cat:'tools',abbr:'HV'},
  {name:'Hindware',cat:'tiles',abbr:'HW'},
  {name:'Kerovit',cat:'tiles',abbr:'KV'},
  {name:'Roff',cat:'adhesives',abbr:'RF'},
  {name:'DeWalt',cat:'tools',abbr:'DW'},
  {name:'Hettich',cat:'hardware',abbr:'HT'},
  {name:'Tata Agrico',cat:'pipes',abbr:'TA'},
  {name:'ICA',cat:'paints',abbr:'IC'},
  {name:'Gyproc',cat:'panels',abbr:'GY'},
  {name:'Godrej',cat:'hardware',abbr:'GD'},
  {name:'Eboo',cat:'hardware',abbr:'EB'},
  {name:'Blaupunkt',cat:'hardware',abbr:'BL'},
  {name:'Pidilite',cat:'adhesives',abbr:'PD'},
  {name:'Dr. Fixit',cat:'adhesives',abbr:'DF'},
  {name:'Prince Piping',cat:'pipes',abbr:'PP'},
  {name:'Birla HiL',cat:'pipes',abbr:'BH'},
  {name:'CUMI',cat:'tools',abbr:'CU'},
  {name:'JB Plastering',cat:'panels',abbr:'JB'},
  {name:'Sleek Kitchens',cat:'hardware',abbr:'SK'},
  {name:'Kajaria',cat:'tiles',abbr:'KJ'},
  {name:'Chetak',cat:'panels',abbr:'CK'},
];

const CATS=[
  {id:'hardware',label:'Kitchen, Furniture & Door Hardware',icon:'⚙',
   desc:'World-class hardware for kitchens, furniture, and doors.',
   longDesc:'From precision-engineered drawer slides to elegant door handles, our hardware range covers every fitting need in your home or commercial space.',
   brands:['Hettich','Godrej','Eboo','Blaupunkt','Sleek Kitchens'],
   products:['Drawer Slides & Runners','Hinges & Soft-Close Mechanisms','Cabinet Handles & Knobs','Lift Systems & Flap Fittings','Door Closers & Locks','Pull-Out Baskets & Organizers','Modular Kitchen Fittings'],
   color:'#0D1B3E'},
  {id:'adhesives',label:'Adhesives & Surface Solutions',icon:'◈',
   desc:'Industrial-strength adhesives, waterproofing, tile grouts and surface treatments.',
   longDesc:'Our adhesives and surface solutions range covers everything from construction-grade bonding to precision surface finishing.',
   brands:['Fevicol','Pidilite','Dr. Fixit','Roff','3M'],
   products:['Tile Adhesives & Grouts','Wood & Laminate Adhesives','Waterproofing Membranes','Sealants & Silicones','Wall Putty & Primers','Construction Chemicals','Floor Levelling Compounds'],
   color:'#1B3A5C'},
  {id:'panels',label:'Panels & Gypsum Boards',icon:'▣',
   desc:'Premium ceiling systems, partition panels, and gypsum solutions.',
   longDesc:'Transform your interiors with precision-engineered gypsum and panel systems including metal framing, acoustic boards, and fire-rated panels.',
   brands:['Gyproc','JB Plastering','Chetak'],
   products:['Gypsum Boards & Plasterboards','Metal Framing Systems','Acoustic Ceiling Tiles','Partition Wall Systems','Cornice & Coving','Drywall Screws & Compounds','Thermal Insulation Panels'],
   color:'#2D5080'},
  {id:'tiles',label:'Tiles & Sanitary',icon:'◼',
   desc:"Designer tiles and complete bathroom solutions from India's most trusted brands.",
   longDesc:"Our tiles and sanitary range spans designer floor tiles, wall tiles, bathroom suites, and complete sanitary solutions.",
   brands:['Kajaria','Hindware','Kerovit'],
   products:['Vitrified Floor Tiles','Ceramic Wall Tiles','Designer Bathroom Suites','WCs & Washbasins','Shower Systems & Cubicles','Bathroom Accessories','Anti-skid & Outdoor Tiles'],
   color:'#8B6520'},
  {id:'paints',label:'Paints & Coatings',icon:'🎨',
   desc:'Premium interior and exterior paints, wood finishes and protective coatings.',
   longDesc:'Complete your spaces with premium paint range — interior emulsions to exterior weather-resistant coatings and specialty finishes.',
   brands:['Asian Paints','Birla Opus','Nippon Paint','Birla White','ICA'],
   products:['Interior Emulsion Paints','Exterior Weatherproof Coatings','Wood Stains & Finishes','Wall Putty & Primer','Floor & Deck Coatings','Texture & Designer Finishes','Industrial & Metal Coatings'],
   color:'#6A4010'},
  {id:'tools',label:'Power Tools & Equipment',icon:'🔧',
   desc:'Professional-grade power tools and construction equipment.',
   longDesc:'Equip your crew with the best. Our power tools section stocks drills, grinders, saws, sanders, and full construction equipment.',
   brands:['DeWalt','CUMI','Havells'],
   products:['Drills & Impact Drivers','Angle Grinders & Polishers','Circular & Jig Saws','Sanders & Finishers','Concrete Mixers & Vibrators','Measuring & Levelling Tools','Electrical & Power Accessories'],
   color:'#4A2010'},
  {id:'pipes',label:'Pipes & Plumbing',icon:'🔩',
   desc:'Complete piping solutions — CPVC, uPVC, and specialty pipes.',
   longDesc:'From supply lines to drainage systems, our pipes and plumbing range covers the full spectrum of residential and commercial needs.',
   brands:['Prince Piping','Tata Agrico','Birla HiL'],
   products:['CPVC Hot & Cold Water Pipes','uPVC Drainage Pipes','Agricultural & Irrigation Pipes','Pipe Fittings & Connectors','Ball Valves & Gate Valves','Water Storage Tanks','Plumbing Tools & Accessories'],
   color:'#0E3A22'},
];

const catColorMap={
  hardware:'#0D1B3E',adhesives:'#1B3A5C',panels:'#2D5080',
  tiles:'#8B6520',paints:'#6A4010',tools:'#4A2010',pipes:'#0E3A22',
};

/* ─── HOOKS ──────────────────────────────────────────────── */
const useInView=(threshold=0.08)=>{
  const ref=useRef(null);
  const [inView,setInView]=useState(false);
  useEffect(()=>{
    const el=ref.current;
    if(!el)return;
    /* immediate check — if already in viewport, show now */
    const rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight&&rect.bottom>0){setInView(true);return;}
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){setInView(true);obs.disconnect();}
    },{threshold,rootMargin:'0px 0px 80px 0px'});
    obs.observe(el);
    return()=>obs.disconnect();
  },[threshold]);
  return[ref,inView];
};

/* ─── ANIMATED COUNTER ────────────────────────────────────── */
const Counter=({target,suffix='',duration=1800})=>{
  const [ref,inView]=useInView(0.3);
  const [val,setVal]=useState(0);
  const started=useRef(false);
  useEffect(()=>{
    if(!inView||started.current)return;
    started.current=true;
    const isNum=!isNaN(parseInt(target));
    if(!isNum){setVal(target);return;}
    const end=parseInt(target.replace(/\D/g,''));
    const step=Math.ceil(end/60);
    let cur=0;
    const t=setInterval(()=>{
      cur=Math.min(cur+step,end);
      setVal(cur);
      if(cur>=end)clearInterval(t);
    },duration/60);
    return()=>clearInterval(t);
  },[inView,target,duration]);
  const display=typeof val==='number'&&val>0?val+(target.includes('+')?('+'):''):target;
  return <span ref={ref}>{display}{suffix}</span>;
};

/* ─── REVEAL WRAPPER ─────────────────────────────────────── */
const Reveal=({children,delay=0,dir='up',style={}})=>{
  const [ref,inView]=useInView(0.1);
  const transforms={up:'translateY(40px)',down:'translateY(-40px)',left:'translateX(-40px)',right:'translateX(40px)'};
  return(
    <div ref={ref} style={{
      opacity:inView?1:0,
      transform:inView?'none':transforms[dir]||transforms.up,
      transition:`opacity 0.7s ${delay}s cubic-bezier(.22,.68,0,1.1), transform 0.7s ${delay}s cubic-bezier(.22,.68,0,1.1)`,
      ...style,
    }}>{children}</div>
  );
};

/* ─── PLACEHOLDER IMAGE ─────────────────────────────────── */
const ImgPlaceholder=({h=280,label='Add Your Image Here',radius=16})=>(
  <div style={{
    height:`${h}px`,borderRadius:`${radius}px`,
    background:'linear-gradient(135deg,#e8e4dc 0%,#d8d4cc 50%,#e4e0d8 100%)',
    display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
    gap:'12px',border:'2px dashed rgba(13,27,62,0.12)',position:'relative',overflow:'hidden',
  }}>
    <div style={{position:'absolute',inset:0,opacity:0.04,
      backgroundImage:'linear-gradient(45deg,#0D1B3E 25%,transparent 25%),linear-gradient(-45deg,#0D1B3E 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0D1B3E 75%),linear-gradient(-45deg,transparent 75%,#0D1B3E 75%)',
      backgroundSize:'20px 20px',backgroundPosition:'0 0,0 10px,10px -10px,-10px 0'}}/>
    <div style={{fontSize:'32px',opacity:'0.35'}}>📷</div>
    <div style={{fontSize:'11px',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',
      color:'rgba(13,27,62,0.38)'}}>{label}</div>
  </div>
);

/* ─── HERO CANVAS (mouse-reactive) ───────────────────────── */
const HeroCanvas=()=>{
  const canvasRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    let raf,W,H;
    const mouse={x:-9999,y:-9999};
    const GOLD='rgba(201,168,76,';
    const WHITE='rgba(255,255,255,';
    let nodes=[];

    const mkNode=()=>({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,
      r:Math.random()*2.2+0.6,
      gold:Math.random()>0.65,
      opacity:Math.random()*0.55+0.12,
      ox:0,oy:0,
    });

    const resize=()=>{
      W=canvas.width=canvas.offsetWidth;
      H=canvas.height=canvas.offsetHeight;
      nodes=Array.from({length:58},mkNode);
    };
    resize();
    window.addEventListener('resize',resize);

    const onMove=e=>{
      const rect=canvas.getBoundingClientRect();
      mouse.x=e.clientX-rect.left;
      mouse.y=e.clientY-rect.top;
    };
    canvas.parentElement.addEventListener('mousemove',onMove);
    canvas.parentElement.addEventListener('mouseleave',()=>{mouse.x=-9999;mouse.y=-9999;});

    const tick=()=>{
      ctx.clearRect(0,0,W,H);

      nodes.forEach(n=>{
        /* mouse repulsion */
        const dx=n.x-mouse.x, dy=n.y-mouse.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          const force=(120-dist)/120*0.8;
          n.ox+=(dx/dist)*force;
          n.oy+=(dy/dist)*force;
        }
        n.ox*=0.92; n.oy*=0.92;
        n.x+=n.vx+n.ox; n.y+=n.vy+n.oy;
        if(n.x<0||n.x>W)n.vx*=-1;
        if(n.y<0||n.y>H)n.vy*=-1;
      });

      /* connections */
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<140){
            const a=(1-d/140)*0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x,nodes[i].y);
            ctx.lineTo(nodes[j].x,nodes[j].y);
            ctx.strokeStyle=nodes[i].gold?GOLD+a+')':WHITE+a+')';
            ctx.lineWidth=0.7;
            ctx.stroke();
          }
        }
      }

      /* nodes */
      nodes.forEach(n=>{
        /* glow ring near mouse */
        const dx=n.x-mouse.x, dy=n.y-mouse.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<160){
          ctx.beginPath();
          ctx.arc(n.x,n.y,n.r*3,0,Math.PI*2);
          ctx.fillStyle=GOLD+((1-dist/160)*0.18)+')';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
        ctx.fillStyle=n.gold?GOLD+n.opacity+')':WHITE+(n.opacity*0.55)+')';
        ctx.fill();
      });

      /* blueprint crosshairs */
      nodes.filter((_,i)=>i%9===0).forEach(n=>{
        ctx.beginPath();
        ctx.moveTo(n.x-10,n.y);ctx.lineTo(n.x+10,n.y);
        ctx.moveTo(n.x,n.y-10);ctx.lineTo(n.x,n.y+10);
        ctx.strokeStyle=GOLD+'0.1)';
        ctx.lineWidth=0.5;
        ctx.stroke();
      });

      raf=requestAnimationFrame(tick);
    };
    tick();
    return()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',resize);
    };
  },[]);
  return(
    <canvas ref={canvasRef} style={{
      position:'absolute',inset:0,width:'100%',height:'100%',
      pointerEvents:'none',zIndex:1,
    }}/>
  );
};

/* ─── SCROLL INDICATOR ───────────────────────────────────── */
const ScrollIndicator=()=>{
  const [visible,setVisible]=useState(true);
  useEffect(()=>{
    const fn=()=>setVisible(window.scrollY<80);
    window.addEventListener('scroll',fn);
    return()=>window.removeEventListener('scroll',fn);
  },[]);
  return(
    <div style={{
      position:'absolute',bottom:'32px',left:'50%',transform:'translateX(-50%)',
      zIndex:7,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',
      opacity:visible?1:0,transition:'opacity 0.4s',
    }}>
      <span style={{fontSize:'9px',fontWeight:'600',letterSpacing:'2.5px',textTransform:'uppercase',
        color:'rgba(255,255,255,0.3)'}}>Scroll</span>
      <div style={{width:'1px',height:'40px',position:'relative',overflow:'hidden',background:'rgba(255,255,255,0.12)'}}>
        <div style={{
          position:'absolute',top:0,left:0,width:'100%',
          background:'linear-gradient(to bottom,transparent,var(--gold),transparent)',
          animation:'scrollDot 1.6s ease-in-out infinite',
          height:'50%',
        }}/>
      </div>
    </div>
  );
};

/* ─── HERO TICKER ────────────────────────────────────────── */
const HeroTicker=({go})=>{
  const items=['30+ Premium Brands','7 Product Categories','Panchkula & Chandigarh','Hardware · Tiles · Paints','Free Consultation Available','Project & Bulk Supply'];
  const [idx,setIdx]=useState(0);
  useEffect(()=>{
    const t=setInterval(()=>setIdx(i=>(i+1)%items.length),2200);
    return()=>clearInterval(t);
  },[]);
  return(
    <div style={{
      display:'inline-flex',alignItems:'center',gap:'14px',
      background:'rgba(201,168,76,0.08)',
      border:'1px solid rgba(201,168,76,0.22)',
      borderRadius:'100px',padding:'8px 20px 8px 12px',marginBottom:'36px',
      animation:'fadeUp 0.6s ease both',
    }}>
      <div style={{
        background:'linear-gradient(135deg,var(--gold),var(--gold3))',
        borderRadius:'100px',padding:'4px 10px',
        fontSize:'9px',fontWeight:'700',color:'var(--navy)',letterSpacing:'1.5px',textTransform:'uppercase',
        flexShrink:0,
      }}>Live</div>
      <span style={{
        color:'var(--gold)',fontSize:'10px',fontWeight:'600',letterSpacing:'1.8px',textTransform:'uppercase',
        transition:'opacity 0.3s',
      }} key={idx}>{items[idx]}</span>
    </div>
  );
};

/* ─── BRAND MARQUEE ─────────────────────────────────────── */
const BrandMarquee=()=>{
  const names=BRANDS.map(b=>b.name);
  const r1=[...names.slice(0,14),...names.slice(0,14)];
  const r2=[...names.slice(13),...names.slice(13)];
  const pill=(name,i)=>(
    <span key={i} style={{
      display:'inline-flex',alignItems:'center',gap:'9px',
      padding:'9px 26px',margin:'0 6px',
      background:'rgba(255,255,255,0.07)',
      border:'1px solid rgba(201,168,76,0.2)',
      borderRadius:'100px',whiteSpace:'nowrap',
      color:'rgba(255,255,255,0.78)',
      fontSize:'13px',fontWeight:'500',letterSpacing:'0.3px',
      backdropFilter:'blur(8px)',
      transition:'all 0.22s',cursor:'default',
    }}
    onMouseEnter={e=>{
      e.currentTarget.style.background='rgba(201,168,76,0.14)';
      e.currentTarget.style.borderColor='rgba(201,168,76,0.5)';
      e.currentTarget.style.color='var(--gold)';
    }}
    onMouseLeave={e=>{
      e.currentTarget.style.background='rgba(255,255,255,0.07)';
      e.currentTarget.style.borderColor='rgba(201,168,76,0.2)';
      e.currentTarget.style.color='rgba(255,255,255,0.78)';
    }}>
      <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--gold)',flexShrink:0}}/>
      {name}
    </span>
  );
  return(
    <div style={{overflow:'hidden',width:'100%',paddingBottom:'4px'}}>
      <div className="marqueeL" style={{display:'flex',width:'max-content',marginBottom:'10px'}}>
        {r1.map((n,i)=>pill(n,i))}
      </div>
      <div className="marqueeR" style={{display:'flex',width:'max-content'}}>
        {r2.map((n,i)=>pill(n,i))}
      </div>
    </div>
  );
};

/* ─── NAV ───────────────────────────────────────────────── */
const Nav=({page,go})=>{
  const [sc,setSc]=useState(false);
  const [pct,setPct]=useState(0);
  const [mOpen,setMOpen]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      setSc(window.scrollY>60);
      const docH=document.body.scrollHeight-window.innerHeight;
      setPct(docH>0?Math.round(window.scrollY/docH*100):0);
    };
    window.addEventListener('scroll',fn);
    return()=>window.removeEventListener('scroll',fn);
  },[]);
  const links=['Home','Products','Gallery','Brands','Tools','About','Contact'];
  const nav=(key)=>{go(key);setMOpen(false);};
  return(
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:1000,
      padding:sc?'12px var(--px)':'22px var(--px)',
      background:sc||mOpen?'rgba(250,248,243,0.97)':'transparent',
      backdropFilter:sc||mOpen?'blur(20px)':'none',
      borderBottom:sc||mOpen?'1px solid var(--border)':'none',
      transition:'all 0.35s ease',
    }}>
      {/* scroll progress bar */}
      <div style={{
        position:'absolute',bottom:0,left:0,height:'2px',
        width:`${pct}%`,
        background:'linear-gradient(90deg,var(--gold),var(--gold3))',
        transition:'width 0.1s',
        opacity:sc?1:0,
      }}/>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div onClick={()=>nav('home')} style={{display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}}>
          <div style={{
            width:'42px',height:'42px',
            background:'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)',
            borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:'Cormorant Garamond,serif',fontSize:'17px',fontWeight:'700',
            color:'var(--gold)',flexShrink:0,transition:'transform 0.2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>GT</div>
          <div>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'15px',fontWeight:'700',
              color:sc||mOpen?'var(--navy)':'#ffffff',lineHeight:'1.1',letterSpacing:'0.5px',transition:'color 0.3s'}}>
              GARG TRADING CO.
            </div>
            <div style={{fontSize:'9px',fontWeight:'600',color:'var(--gold)',letterSpacing:'2.5px',textTransform:'uppercase'}}>
              Building Solutions
            </div>
          </div>
        </div>

        <div className="hide-mobile" style={{display:'flex',alignItems:'center',gap:'4px'}}>
          {links.map(l=>{
            const key=l.toLowerCase();
            const active=page===key||(key==='products'&&page.startsWith('cat-'));
            return(
              <button key={l} onClick={()=>nav(key)} style={{
                background:'none',border:'none',cursor:'pointer',
                padding:'8px 13px',fontSize:'12px',fontWeight:'500',
                fontFamily:'DM Sans,sans-serif',letterSpacing:'0.8px',
                textTransform:'uppercase',
                color:active?'var(--gold)':sc?'var(--navy)':'rgba(255,255,255,0.85)',
                borderBottom:active?'2px solid var(--gold)':'2px solid transparent',
                transition:'all 0.2s',
              }}
              onMouseEnter={e=>{if(!active)e.currentTarget.style.color=sc?'var(--navy)':'#fff'}}
              onMouseLeave={e=>{if(!active)e.currentTarget.style.color=sc?'var(--navy)':'rgba(255,255,255,0.85)'}}
              >{l}</button>
            );
          })}
          <button onClick={()=>nav('contact')} className="btn-gold" style={{padding:'10px 22px',fontSize:'11px',marginLeft:'16px'}}>
            Get Quote
          </button>
        </div>

        {/* Hamburger */}
        <button className="show-mobile" onClick={()=>setMOpen(o=>!o)} style={{
          display:'none',background:'none',border:'none',cursor:'pointer',
          padding:'8px',flexDirection:'column',gap:'5px',
        }}>
          {[0,1,2].map(i=>(
            <span key={i} style={{
              display:'block',width:'24px',height:'2px',borderRadius:'2px',
              background:sc||mOpen?'var(--navy)':'#ffffff',
              transition:'all 0.3s',
              transform:mOpen&&i===0?'rotate(45deg) translate(5px,5px)':
                        mOpen&&i===1?'scaleX(0)':
                        mOpen&&i===2?'rotate(-45deg) translate(5px,-5px)':'none',
              opacity:mOpen&&i===1?0:1,
            }}/>
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mOpen&&(
        <div style={{
          paddingTop:'16px',paddingBottom:'20px',
          animation:'mobileMenuIn 0.25s ease both',
        }}>
          {links.map(l=>{
            const key=l.toLowerCase();
            const active=page===key||(key==='products'&&page.startsWith('cat-'));
            return(
              <button key={l} onClick={()=>nav(key)} style={{
                display:'block',width:'100%',textAlign:'left',
                background:'none',border:'none',cursor:'pointer',
                padding:'13px 4px',fontSize:'14px',fontWeight:'500',
                fontFamily:'DM Sans,sans-serif',letterSpacing:'0.5px',
                textTransform:'uppercase',
                color:active?'var(--gold)':'var(--navy)',
                borderBottom:'1px solid var(--border)',
              }}>{l}</button>
            );
          })}
          <button onClick={()=>nav('contact')} className="btn-gold" style={{
            width:'100%',justifyContent:'center',marginTop:'16px',padding:'14px',
          }}>Get Quote</button>
        </div>
      )}
    </nav>
  );
};

/* ─── SHARED ─────────────────────────────────────────────── */
const GoldLine=({my=32})=>(
  <div style={{height:'1px',background:'linear-gradient(90deg,transparent,var(--gold),transparent)',margin:`${my}px 0`}}/>
);

const PageHero=({tag,title,sub})=>(
  <div style={{
    background:'linear-gradient(158deg,#080F22 0%,#0D1B3E 60%,#162347 100%)',
    padding:'100px var(--px) 80px',position:'relative',overflow:'hidden',
  }}>
    <div style={{position:'absolute',inset:0,
      backgroundImage:'linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)',
      backgroundSize:'50px 50px',pointerEvents:'none'}}/>
    <div style={{position:'relative',zIndex:2,maxWidth:'800px'}}>
      <span className="section-tag">{tag}</span>
      <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:'300',fontStyle:'italic',
        fontSize:'clamp(36px,6.5vw,80px)',color:'#ffffff',lineHeight:'1.08',marginBottom:sub?'20px':'0'}}>
        {title}
      </h1>
      {sub&&<p style={{fontSize:'17px',color:'rgba(255,255,255,0.5)',lineHeight:'1.7',marginTop:'16px',maxWidth:'560px'}}>{sub}</p>}
    </div>
  </div>
);

/* ─── HERO ───────────────────────────────────────────────── */
const Hero=({go})=>(
  <section style={{
    minHeight:'100vh',
    background:'linear-gradient(158deg,#060C1C 0%,#0D1B3E 45%,#162347 100%)',
    display:'flex',flexDirection:'column',justifyContent:'center',
    paddingTop:'90px',position:'relative',overflow:'hidden',
  }}>
    <HeroCanvas/>
    <div style={{position:'absolute',inset:0,
      backgroundImage:'linear-gradient(rgba(201,168,76,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.022) 1px,transparent 1px)',
      backgroundSize:'56px 56px',pointerEvents:'none',zIndex:2}}/>

    {/* architectural arc decoration */}
    <div style={{position:'absolute',top:'-120px',right:'-120px',width:'560px',height:'560px',
      border:'1px solid rgba(201,168,76,0.06)',borderRadius:'50%',pointerEvents:'none',zIndex:2}}/>
    <div style={{position:'absolute',top:'-60px',right:'-60px',width:'400px',height:'400px',
      border:'1px solid rgba(201,168,76,0.04)',borderRadius:'50%',pointerEvents:'none',zIndex:2}}/>

    {/* Content */}
    <div className="hero-pad" style={{position:'relative',zIndex:5,padding:'0 var(--px) 60px',maxWidth:'1200px',margin:'0 auto',width:'100%'}}>

      <HeroTicker go={go}/>

      <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:'300',color:'#ffffff',
        fontSize:'clamp(52px,8.5vw,102px)',lineHeight:'1.02',marginBottom:'0',
        animation:'fadeUp 0.7s 0.1s ease both',opacity:0}}>
        All Building
      </h1>
      <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:'700',fontStyle:'italic',
        fontSize:'clamp(52px,8.5vw,102px)',lineHeight:'1.02',
        background:'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 55%,var(--gold) 100%)',
        WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        animation:'fadeUp 0.7s 0.18s ease both',opacity:0}}>
        Solutions
      </h1>
      <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:'300',color:'#ffffff',
        fontSize:'clamp(52px,8.5vw,102px)',lineHeight:'1.02',marginBottom:'40px',
        animation:'fadeUp 0.7s 0.26s ease both',opacity:0}}>
        Under One Roof
      </h1>

      <p style={{color:'rgba(255,255,255,0.5)',fontSize:'18px',fontWeight:'300',
        maxWidth:'520px',lineHeight:'1.78',marginBottom:'48px',
        animation:'fadeUp 0.7s 0.36s ease both',opacity:0}}>
        30+ premium brands across 7 categories — hardware, tiles, paints, panels, tools & more. One call, one vendor, your entire project delivered.
      </p>

      <div style={{display:'flex',gap:'14px',flexWrap:'wrap',animation:'fadeUp 0.7s 0.44s ease both',opacity:0}}>
        <button onClick={()=>go('contact')} className="btn-gold">Free Consultation</button>
        <button onClick={()=>go('products')} className="btn-ghost">Explore Products</button>
        <button onClick={()=>go('tools')} style={{
          display:'inline-flex',alignItems:'center',gap:'10px',
          background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.7)',
          border:'1px solid rgba(255,255,255,0.14)',borderRadius:'6px',
          padding:'14px 28px',fontSize:'12px',fontWeight:'500',
          fontFamily:'DM Sans,sans-serif',letterSpacing:'1.2px',
          textTransform:'uppercase',cursor:'pointer',transition:'all 0.25s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,0.1)';e.currentTarget.style.borderColor='rgba(201,168,76,0.3)';e.currentTarget.style.color='var(--gold)'}}
        onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.borderColor='rgba(255,255,255,0.14)';e.currentTarget.style.color='rgba(255,255,255,0.7)'}}>
          🔢 Project Tools
        </button>
      </div>

      {/* mini stat strip */}
      <div style={{display:'flex',gap:'36px',flexWrap:'wrap',marginTop:'56px',
        animation:'fadeUp 0.7s 0.55s ease both',opacity:0}}>
        {[{n:'30+',l:'Brands'},{n:'7',l:'Categories'},{n:'2',l:'Stores'},{n:'1000s',l:'Projects'}].map((s,i)=>(
          <div key={i}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'28px',fontWeight:'700',
              color:'var(--gold)',lineHeight:'1'}}>{s.n}</div>
            <div style={{fontSize:'10px',fontWeight:'600',letterSpacing:'1.5px',
              textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginTop:'3px'}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Brand marquee */}
    <div style={{position:'relative',zIndex:5,padding:'0 0 20px',
      animation:'fadeUp 0.7s 0.62s ease both',opacity:0}}>
      <div style={{textAlign:'center',fontSize:'9px',fontWeight:'600',letterSpacing:'3px',
        textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'16px'}}>
        Our Trusted Brand Portfolio
      </div>
      <BrandMarquee/>
    </div>

    <div style={{position:'absolute',bottom:0,left:0,right:0,height:'140px',
      background:'linear-gradient(transparent,var(--cream))',zIndex:6,pointerEvents:'none'}}/>
    <ScrollIndicator/>
  </section>
);

/* ─── STATS (animated counters) ─────────────────────────── */
const Stats=()=>{
  const [ref,inView]=useInView(0.2);
  return(
    <section style={{padding:'0 var(--px) 80px',background:'var(--cream)'}}>
      <div ref={ref} style={{
        display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',
        background:'var(--border)',border:'1px solid var(--border)',
        borderRadius:'18px',overflow:'hidden',
        boxShadow:'0 8px 40px rgba(13,27,62,0.06)',
      }}>
        {[
          {n:'30+',l:'Premium Brands',s:"India's finest names"},
          {n:'7',l:'Product Categories',s:'Complete ecosystem'},
          {n:'2',l:'Store Locations',s:'Panchkula & Chandigarh'},
          {n:'1000s',l:'Projects Supplied',s:'Across the region'},
        ].map((s,i)=>(
          <div key={i} style={{
            background:'var(--white)',padding:'44px 28px',textAlign:'center',
            opacity:inView?1:0,
            transform:inView?'none':'translateY(24px)',
            transition:`opacity 0.6s ${i*0.1}s ease, transform 0.6s ${i*0.1}s ease`,
          }}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'54px',fontWeight:'700',
              color:'var(--navy)',lineHeight:'1',marginBottom:'8px'}}>
              {inView?<Counter target={s.n}/>:s.n}
            </div>
            <div style={{fontSize:'14px',fontWeight:'600',color:'var(--navy)',marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontSize:'11px',color:'var(--gold)',fontWeight:'500',letterSpacing:'0.3px'}}>{s.s}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── INTERACTIVE CATEGORY CARD ──────────────────────────── */
const CatCard=({cat,go,wide=false})=>{
  const [hov,setHov]=useState(false);
  return(
    <div
      onClick={()=>go('cat-'+cat.id)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:'var(--white)',
        border:`1px solid ${hov?'var(--gold)':'var(--border)'}`,
        borderRadius:'18px',padding:'36px 34px',cursor:'pointer',
        position:'relative',overflow:'hidden',
        transform:hov?'translateY(-6px)':'none',
        boxShadow:hov?'0 24px 56px rgba(13,27,62,0.10)':'0 2px 12px rgba(13,27,62,0.04)',
        transition:'all 0.3s cubic-bezier(.22,.68,0,1.1)',
        ...(wide?{gridColumn:'span 2'}:{}),
      }}>
      {/* shimmer on hover */}
      <div style={{
        position:'absolute',inset:0,
        background:'linear-gradient(135deg,transparent 40%,rgba(201,168,76,0.04) 50%,transparent 60%)',
        backgroundSize:'200% 100%',
        backgroundPosition:hov?'100% 0':'200% 0',
        transition:'background-position 0.6s ease',
        pointerEvents:'none',
      }}/>
      <div style={{position:'absolute',top:0,right:0,width:'80px',height:'80px',
        background:'linear-gradient(225deg,rgba(201,168,76,0.07) 0%,transparent 65%)',pointerEvents:'none'}}/>

      <div style={{
        width:'48px',height:'48px',
        background:hov?`linear-gradient(135deg,${cat.color},${cat.color}bb)`:'rgba(13,27,62,0.06)',
        borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',
        fontSize:'20px',marginBottom:'18px',
        transition:'all 0.3s',
        transform:hov?'scale(1.1) rotate(-4deg)':'none',
      }}>{cat.icon}</div>

      <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'21px',fontWeight:'600',
        color:'var(--navy)',marginBottom:'10px',lineHeight:'1.3'}}>{cat.label}</h3>
      <p style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65',marginBottom:'16px'}}>{cat.desc}</p>

      {/* brand pills */}
      <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'16px'}}>
        {cat.brands.map(b=>(
          <span key={b} style={{
            background:hov?'rgba(201,168,76,0.08)':'rgba(13,27,62,0.05)',
            border:`1px solid ${hov?'rgba(201,168,76,0.3)':'transparent'}`,
            borderRadius:'100px',padding:'4px 12px',fontSize:'11px',
            fontWeight:'500',color:'var(--navy)',letterSpacing:'0.2px',
            transition:'all 0.25s',
          }}>{b}</span>
        ))}
      </div>

      {/* product preview on hover */}
      <div style={{
        maxHeight:hov?'120px':'0px',
        overflow:'hidden',
        transition:'max-height 0.4s cubic-bezier(.22,.68,0,1.1)',
        borderTop:hov?'1px solid var(--border)':'1px solid transparent',
        paddingTop:hov?'14px':'0',
        transition:'all 0.35s ease',
      }}>
        <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
          {cat.products.slice(0,4).map((p,i)=>(
            <span key={i} style={{
              fontSize:'10px',color:'var(--txt3)',fontWeight:'500',letterSpacing:'0.3px',
              background:'rgba(13,27,62,0.04)',borderRadius:'4px',padding:'3px 8px',
            }}>{p}</span>
          ))}
          {cat.products.length>4&&<span style={{fontSize:'10px',color:'var(--gold)',fontWeight:'600'}}>+{cat.products.length-4} more</span>}
        </div>
      </div>

      <div style={{
        display:'flex',alignItems:'center',gap:'6px',marginTop:'14px',
        fontSize:'11px',fontWeight:'700',color:hov?'var(--gold)':'var(--navy)',
        letterSpacing:'1.5px',textTransform:'uppercase',transition:'color 0.25s',
      }}>
        Explore Category
        <span style={{transform:hov?'translateX(4px)':'none',transition:'transform 0.25s'}}>→</span>
      </div>
    </div>
  );
};

/* ─── WHY GT CARD (interactive) ─────────────────────────── */
const WhyCard=({item,i})=>{
  const [hov,setHov]=useState(false);
  const [ref,inView]=useInView(0.1);
  return(
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      background:hov?'rgba(201,168,76,0.07)':'rgba(255,255,255,0.04)',
      border:`1px solid ${hov?'rgba(201,168,76,0.35)':'rgba(201,168,76,0.12)'}`,
      borderRadius:'16px',padding:'36px 30px',
      transition:'all 0.28s ease',cursor:'default',
      opacity:inView?1:0,
      transform:inView?'none':`translateY(30px)`,
      transitionDelay:`${i*0.08}s`,
    }}>
      <div style={{
        fontFamily:'Cormorant Garamond,serif',fontSize:'30px',color:'var(--gold)',
        marginBottom:'18px',
        transform:hov?'scale(1.15) rotate(-6deg)':'none',
        display:'inline-block',
        transition:'transform 0.3s cubic-bezier(.22,.68,0,1.1)',
      }}>{item.i}</div>
      <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'20px',fontWeight:'600',
        color:'#ffffff',marginBottom:'12px'}}>{item.t}</h3>
      <p style={{fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:'1.7',
        maxHeight:hov?'200px':'60px',overflow:'hidden',
        transition:'max-height 0.4s ease',
      }}>{item.d}</p>
      {hov&&<div style={{
        marginTop:'16px',fontSize:'11px',fontWeight:'600',
        color:'var(--gold)',letterSpacing:'1.5px',textTransform:'uppercase',
      }}>Learn more →</div>}
    </div>
  );
};

/* ─── HOME PAGE ─────────────────────────────────────────── */
const HomePage=({go})=>(
  <div>
    <Hero go={go}/>
    <Stats/>

    {/* CATEGORIES GRID */}
    <section className="section-pad" style={{padding:'40px var(--px) 80px',background:'var(--cream)'}}>
      <Reveal>
        <div style={{marginBottom:'52px'}}>
          <span className="section-tag">What We Offer</span>
          <h2 className="section-h">Seven Categories.<br/>One Destination.</h2>
        </div>
      </Reveal>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="grid-3">
        {CATS.map((c,i)=>(
          <Reveal key={c.id} delay={i*0.06} style={i===0?{gridColumn:'span 2'}:{}}>
            <CatCard cat={c} go={go} wide={false}/>
          </Reveal>
        ))}
      </div>
    </section>

    {/* GALLERY STRIP */}
    <section style={{padding:'0 var(--px) 80px',background:'var(--cream)'}}>
      <Reveal>
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr',gap:'16px'}} className="grid-3">
          <ImgPlaceholder h={320} label="Showroom Interior"/>
          <ImgPlaceholder h={320} label="Hardware Display"/>
          <ImgPlaceholder h={320} label="Tile Collection"/>
        </div>
      </Reveal>
    </section>

    {/* WHY GT */}
    <section style={{padding:'80px var(--px)',background:'var(--navy)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,
        backgroundImage:'linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)',
        backgroundSize:'50px 50px',pointerEvents:'none'}}/>
      <div style={{position:'relative',zIndex:2}}>
        <Reveal>
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <span className="section-tag">The GT Advantage</span>
            <h2 className="section-h-light">Why Professionals Choose Us</h2>
          </div>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}} className="grid-3">
          {[
            {i:'✦',t:'Trusted Premium Brands',d:'30+ industry-leading brands. Every product is genuine, certified, and sourced directly from manufacturers. No grey market, no compromise.'},
            {i:'◈',t:'Single Vendor Convenience',d:'One supplier for your entire project. Save time, cut coordination overhead, streamline logistics, and have one point of accountability.'},
            {i:'▣',t:'Project & Bulk Supply',d:'Contractor-grade bulk supply with priority stock allocation, dedicated account managers, project pricing, and scheduled deliveries.'},
            {i:'⏱',t:'Time Saving & Reliable',d:'Ready inventory ensures your project never waits on materials. We deliver when you need it, every time, without delays.'},
            {i:'₹',t:'Competitive Pricing',d:'Direct dealerships mean zero middleman markups. Best rates across the board for retail and bulk alike, with transparent quotations.'},
            {i:'◎',t:'Dedicated Expert Support',d:'Product guidance, specification advice, free consultations, and after-sales support on every order — from a team that understands construction.'},
          ].map((item,i)=><WhyCard key={i} item={item} i={i}/>)}
        </div>
      </div>
    </section>

    {/* WHO WE SERVE */}
    <section className="section-pad" style={{padding:'80px var(--px)',background:'var(--cream)'}}>
      <Reveal><div style={{textAlign:'center',marginBottom:'52px'}}>
        <span className="section-tag">Who We Serve</span>
        <h2 className="section-h">Our Ideal Partners</h2>
      </div></Reveal>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'14px'}} className="grid-3">
        {[
          {emoji:'🏗',role:'Architects',desc:'Specify premium materials with confidence'},
          {emoji:'🎨',role:'Interior Designers',desc:'Source all finishes from one trusted partner'},
          {emoji:'🏢',role:'Builders',desc:'Reliable bulk supply on tight timelines'},
          {emoji:'🔧',role:'Contractors',desc:'Competitive pricing on every project'},
          {emoji:'🍳',role:'Kitchen Dealers',desc:'Full modular hardware range always in stock'},
        ].map((p,i)=>{
          const [hov,setHov]=useState(false);
          return(
            <Reveal key={i} delay={i*0.07}>
              <div
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{
                  background:'var(--white)',
                  border:`1px solid ${hov?'var(--gold)':'var(--border)'}`,
                  borderRadius:'16px',padding:'34px 20px',textAlign:'center',
                  transform:hov?'translateY(-5px)':'none',
                  boxShadow:hov?'0 18px 44px rgba(13,27,62,0.09)':'none',
                  transition:'all 0.28s ease',cursor:'default',
                }}>
                <div style={{
                  fontSize:'32px',marginBottom:'16px',display:'block',
                  transform:hov?'scale(1.2)':'scale(1)',transition:'transform 0.3s',
                }}>{p.emoji}</div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'19px',fontWeight:'600',
                  color:'var(--navy)',marginBottom:'8px'}}>{p.role}</div>
                <div style={{fontSize:'12px',color:'var(--txt3)',lineHeight:'1.55'}}>{p.desc}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>

    {/* DUAL BRAND */}
    <section style={{padding:'0 var(--px) 80px',background:'var(--cream)'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}} className="grid-2">
        {[
          {code:'GT',name:'Garg Trading Company',
           desc:'The flagship brand for hardware, adhesives, panels, paints, tools, and complete building solutions. Your single point of contact for any construction project.',
           addr:'Plot No. 1, Industrial Area Phase 1, Panchkula, Haryana 134109',
           ph:'+91 92168 66671'},
          {code:'GS',name:'Gujarat Tiles & Sanitary Depot',
           desc:'Specialized in premium tiles and sanitary ware. Designer tiles, bathroom solutions, and surface finishes curated for architects and discerning homeowners.',
           addr:'SCO 22-23, Phase 2, Industrial Area, Chandigarh',
           ph:'+91 98140 33573'},
        ].map((e,i)=>(
          <Reveal key={i} delay={i*0.1}>
            <div style={{
              background:'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)',
              borderRadius:'20px',padding:'52px 46px',position:'relative',overflow:'hidden',
              height:'100%',
            }}>
              <div style={{position:'absolute',top:'-30px',right:'-30px',width:'160px',height:'160px',
                borderRadius:'50%',background:'rgba(201,168,76,0.05)',pointerEvents:'none'}}/>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'60px',fontWeight:'700',
                color:'var(--gold)',lineHeight:'1',marginBottom:'14px',opacity:'0.22'}}>{e.code}</div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'26px',fontWeight:'600',
                color:'#ffffff',marginBottom:'18px',lineHeight:'1.2'}}>{e.name}</h3>
              <p style={{fontSize:'14px',color:'rgba(255,255,255,0.54)',lineHeight:'1.72',marginBottom:'30px'}}>{e.desc}</p>
              <GoldLine my={0}/>
              <div style={{paddingTop:'24px',display:'flex',flexDirection:'column',gap:'10px'}}>
                <div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',lineHeight:'1.55'}}>📍 {e.addr}</div>
                <a href={`tel:${e.ph.replace(/\s/g,'')}`}
                  style={{color:'var(--gold)',fontSize:'15px',fontWeight:'600',textDecoration:'none'}}>
                  📞 {e.ph}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* CTA STRIP */}
    <section style={{
      padding:'80px var(--px)',
      background:'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 55%,var(--gold) 100%)',
      textAlign:'center',position:'relative',overflow:'hidden',
    }}>
      <div style={{position:'absolute',inset:0,
        backgroundImage:'linear-gradient(rgba(13,27,62,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(13,27,62,0.06) 1px,transparent 1px)',
        backgroundSize:'38px 38px',pointerEvents:'none'}}/>
      <Reveal>
        <div style={{position:'relative',zIndex:2}}>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:'700',color:'var(--navy)',
            fontSize:'clamp(34px,5vw,62px)',lineHeight:'1.08',marginBottom:'20px'}}>
            Ready to Build Something<br/>Remarkable?
          </h2>
          <p style={{fontSize:'17px',color:'rgba(13,27,62,0.65)',marginBottom:'44px',
            maxWidth:'480px',margin:'0 auto 44px',lineHeight:'1.65'}}>
            Visit our stores or call for a free consultation. We'll help you source everything your project needs.
          </p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="tel:+919216866671" style={{
              display:'inline-flex',alignItems:'center',gap:'9px',
              background:'var(--navy)',color:'var(--gold)',
              padding:'15px 38px',borderRadius:'6px',
              fontWeight:'600',fontSize:'12px',letterSpacing:'1.2px',
              textDecoration:'none',textTransform:'uppercase',
              transition:'transform 0.2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              📞 Call Now
            </a>
            <a href="https://wa.me/919216866671" target="_blank" style={{
              display:'inline-flex',alignItems:'center',gap:'9px',
              background:'#25D366',color:'#ffffff',
              padding:'15px 38px',borderRadius:'6px',
              fontWeight:'600',fontSize:'12px',letterSpacing:'1.2px',
              textDecoration:'none',textTransform:'uppercase',
              transition:'transform 0.2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  </div>
);

/* ─── PRODUCTS PAGE ─────────────────────────────────────── */
const ProductsPage=({go})=>(
  <div style={{background:'var(--cream)',minHeight:'100vh'}}>
    <PageHero tag="Our Product Range" title={"Complete Building\nSolutions, Curated."} />
    <div style={{padding:'64px var(--px) 80px'}}>
      {CATS.map((cat,i)=>(
        <Reveal key={cat.id} delay={i*0.05}>
          <div onClick={()=>go('cat-'+cat.id)}
            style={{
              background:'var(--white)',border:'1px solid var(--border)',
              borderRadius:'20px',padding:'50px',marginBottom:'20px',
              display:'grid',gridTemplateColumns:'1fr 1.6fr',gap:'50px',alignItems:'start',
              cursor:'pointer',transition:'all 0.28s',
            }}
            className="grid-2 card-hover">
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'22px'}}>
                <div style={{width:'52px',height:'52px',
                  background:`linear-gradient(135deg,${cat.color} 0%,${cat.color}cc 100%)`,
                  borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'22px',flexShrink:0}}>{cat.icon}</div>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'26px',fontWeight:'600',
                  color:'var(--navy)',lineHeight:'1.2'}}>{cat.label}</h3>
              </div>
              <p style={{fontSize:'14px',color:'var(--txt2)',lineHeight:'1.7',marginBottom:'20px'}}>{cat.desc}</p>
              <div style={{fontSize:'10px',fontWeight:'600',letterSpacing:'2px',
                textTransform:'uppercase',color:'var(--gold)',marginBottom:'16px'}}>
                {cat.brands.length} brands available
              </div>
              <span style={{fontSize:'11px',fontWeight:'600',color:'var(--navy)',letterSpacing:'1.5px',
                textTransform:'uppercase',borderBottom:'1px solid var(--gold)',paddingBottom:'2px'}}>
                View Full Category →
              </span>
            </div>
            <div>
              <div style={{fontSize:'10px',fontWeight:'600',letterSpacing:'2px',
                textTransform:'uppercase',color:'var(--navy)',opacity:'0.35',marginBottom:'18px'}}>
                Brands in this category
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
                {cat.brands.map(b=>(
                  <div key={b} style={{
                    background:'rgba(13,27,62,0.04)',border:'1px solid rgba(13,27,62,0.09)',
                    borderRadius:'100px',padding:'10px 22px',
                    fontSize:'13px',fontWeight:'500',color:'var(--navy)',
                  }}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

/* ─── CATEGORY PAGE ─────────────────────────────────────── */
const CategoryPage=({cat,go})=>(
  <div style={{background:'var(--cream)',minHeight:'100vh'}}>
    <div style={{
      background:`linear-gradient(158deg,${cat.color}ee 0%,${cat.color} 60%,${cat.color}dd 100%)`,
      padding:'100px var(--px) 80px',position:'relative',overflow:'hidden',
    }}>
      <div style={{position:'absolute',inset:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
        backgroundSize:'50px 50px',pointerEvents:'none'}}/>
      <button onClick={()=>go('products')} style={{
        background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',
        borderRadius:'100px',padding:'8px 18px',color:'rgba(255,255,255,0.7)',
        fontSize:'11px',fontWeight:'600',letterSpacing:'1px',textTransform:'uppercase',
        cursor:'pointer',marginBottom:'32px',fontFamily:'DM Sans,sans-serif',display:'block',
      }}>← All Categories</button>
      <div style={{position:'relative',zIndex:2,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'center'}} className="grid-2">
        <div>
          <div style={{width:'64px',height:'64px',background:'rgba(255,255,255,0.12)',
            borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:'28px',marginBottom:'20px'}}>{cat.icon}</div>
          <span style={{fontSize:'10px',fontWeight:'600',letterSpacing:'3px',textTransform:'uppercase',
            color:'rgba(255,255,255,0.5)',display:'block',marginBottom:'14px'}}>Product Category</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:'600',
            fontSize:'clamp(36px,5.5vw,68px)',color:'#ffffff',lineHeight:'1.1',marginBottom:'20px'}}>
            {cat.label}
          </h1>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.6)',lineHeight:'1.7',maxWidth:'500px'}}>
            {cat.longDesc}
          </p>
        </div>
        <div><ImgPlaceholder h={340} label={`${cat.label} — Add Photo`} radius={20}/></div>
      </div>
    </div>

    <div style={{padding:'64px var(--px)',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start'}} className="grid-2">
      <div>
        <span className="section-tag">What We Stock</span>
        <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'36px',fontWeight:'600',
          color:'var(--navy)',marginBottom:'28px',lineHeight:'1.2'}}>Product Range</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {cat.products.map((p,i)=>(
            <Reveal key={i} delay={i*0.04}>
              <div style={{background:'var(--white)',border:'1px solid var(--border)',
                borderRadius:'12px',padding:'16px 22px',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--gold)',flexShrink:0}}/>
                <span style={{fontSize:'14px',color:'var(--navy)',fontWeight:'500'}}>{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div>
        <span className="section-tag">Brands We Carry</span>
        <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'36px',fontWeight:'600',
          color:'var(--navy)',marginBottom:'28px',lineHeight:'1.2'}}>Our Partners</h2>
        {cat.brands.map((b,i)=>(
          <Reveal key={i} delay={i*0.06}>
            <div style={{background:'var(--white)',border:'1px solid var(--border)',
              borderRadius:'16px',padding:'28px 30px',marginBottom:'14px',
              display:'flex',alignItems:'center',gap:'20px'}}>
              <div style={{width:'52px',height:'52px',borderRadius:'12px',flexShrink:0,
                background:`linear-gradient(135deg,${cat.color} 0%,${cat.color}bb 100%)`,
                display:'flex',alignItems:'center',justifyContent:'center',
                color:'var(--gold)',fontFamily:'Cormorant Garamond,serif',
                fontSize:'14px',fontWeight:'700'}}>{b.slice(0,2).toUpperCase()}</div>
              <div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'20px',fontWeight:'600',
                  color:'var(--navy)',marginBottom:'4px'}}>{b}</div>
                <div style={{fontSize:'11px',color:'var(--txt3)',fontWeight:'500',letterSpacing:'0.5px'}}>
                  Authorised Dealer
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <button onClick={()=>go('contact')} className="btn-gold" style={{width:'100%',justifyContent:'center',marginTop:'8px',padding:'15px'}}>
          Get a Quote for This Category
        </button>
      </div>
    </div>

    <div style={{padding:'0 var(--px) 80px'}}>
      <span className="section-tag">Gallery</span>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginTop:'16px'}} className="grid-3">
        <ImgPlaceholder h={220} label="Product Image 1"/>
        <ImgPlaceholder h={220} label="Product Image 2"/>
        <ImgPlaceholder h={220} label="Product Image 3"/>
      </div>
    </div>

    <div style={{padding:'0 var(--px) 80px'}}>
      <div style={{background:'linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%)',
        borderRadius:'20px',padding:'52px',
        display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'24px'}}>
        <div>
          <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'32px',fontWeight:'600',
            color:'#ffffff',marginBottom:'12px'}}>Need Bulk Supply or Project Pricing?</h3>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,0.5)',lineHeight:'1.6'}}>
            Contact us with your project details and get a custom quote within hours.
          </p>
        </div>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
          <button onClick={()=>go('contact')} className="btn-gold">Get Quote</button>
          <a href="https://wa.me/919216866671" target="_blank" style={{
            display:'inline-flex',alignItems:'center',gap:'10px',
            background:'#25D366',color:'#ffffff',border:'none',borderRadius:'6px',
            padding:'14px 28px',fontSize:'12px',fontWeight:'600',
            fontFamily:'DM Sans,sans-serif',letterSpacing:'1.2px',
            textTransform:'uppercase',cursor:'pointer',textDecoration:'none',
          }}>💬 WhatsApp</a>
        </div>
      </div>
    </div>
  </div>
);

/* ─── GALLERY PAGE ──────────────────────────────────────── */
const GALLERY_CATS=[
  {id:'all',label:'All'},
  {id:'hardware',label:'Hardware'},
  {id:'adhesives',label:'Adhesives'},
  {id:'panels',label:'Panels'},
  {id:'tiles',label:'Tiles'},
  {id:'paints',label:'Paints'},
  {id:'tools',label:'Tools'},
  {id:'pipes',label:'Pipes'},
];
const GALLERY_ITEMS=[
  {cat:'hardware',label:'Kitchen Fittings Display',span:2},
  {cat:'hardware',label:'Hettich Drawer Systems'},
  {cat:'hardware',label:'Door Hardware Range'},
  {cat:'tiles',label:'Kajaria Tile Showroom',span:2},
  {cat:'tiles',label:'Bathroom Suite Display'},
  {cat:'tiles',label:'Designer Floor Tiles'},
  {cat:'paints',label:'Asian Paints Swatches'},
  {cat:'paints',label:'Birla Opus Collection',span:2},
  {cat:'adhesives',label:'Fevicol Products'},
  {cat:'adhesives',label:'Dr. Fixit Waterproofing'},
  {cat:'panels',label:'Gyproc Ceiling System',span:2},
  {cat:'panels',label:'Partition Wall Demo'},
  {cat:'tools',label:'DeWalt Power Tools'},
  {cat:'tools',label:'CUMI Grinder Range'},
  {cat:'pipes',label:'CPVC Pipe Range',span:2},
  {cat:'pipes',label:'Fittings & Valves'},
];

const GalleryPage=()=>{
  const [filter,setFilter]=useState('all');
  const shown=filter==='all'?GALLERY_ITEMS:GALLERY_ITEMS.filter(g=>g.cat===filter);
  return(
    <div style={{background:'var(--cream)',minHeight:'100vh'}}>
      <PageHero tag="Photo Gallery" title={"Our Products\n& Showrooms."}
        sub="Browse our curated collection of products, installations, and showroom displays."/>

      {/* Filter tabs */}
      <div style={{padding:'40px var(--px) 0'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {GALLERY_CATS.map(f=>(
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{
              background:filter===f.id?'var(--navy)':'var(--white)',
              border:`1px solid ${filter===f.id?'var(--navy)':'var(--border)'}`,
              borderRadius:'100px',padding:'9px 22px',
              fontSize:'12px',fontWeight:'500',
              fontFamily:'DM Sans,sans-serif',letterSpacing:'0.3px',
              color:filter===f.id?'var(--gold)':'var(--navy)',
              cursor:'pointer',transition:'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <div style={{padding:'32px var(--px) 80px'}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'16px',
        }} className="grid-3">
          {shown.map((item,i)=>(
            <Reveal key={`${filter}-${i}`} delay={i*0.04} style={item.span===2?{gridColumn:'span 2'}:{}}>
              <div style={{
                borderRadius:'16px',overflow:'hidden',
                border:'1px solid var(--border)',
                background:'var(--white)',
                transition:'transform 0.28s ease,box-shadow 0.28s ease',
                cursor:'pointer',
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 20px 48px rgba(13,27,62,0.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
                <ImgPlaceholder h={item.span===2?280:220} label={item.label} radius={0}/>
                <div style={{padding:'16px 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontSize:'13px',fontWeight:'500',color:'var(--navy)'}}>{item.label}</span>
                  <span style={{
                    fontSize:'9px',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',
                    color:'var(--gold)',background:'rgba(201,168,76,0.1)',
                    borderRadius:'100px',padding:'4px 10px',
                  }}>{item.cat}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {shown.length===0&&(
          <div style={{textAlign:'center',padding:'60px 0',color:'var(--txt3)'}}>
            No items in this category yet.
          </div>
        )}

        {/* Upload CTA */}
        <Reveal>
          <div style={{
            marginTop:'56px',
            background:'linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%)',
            borderRadius:'20px',padding:'52px',textAlign:'center',
          }}>
            <span className="section-tag" style={{color:'var(--gold)'}}>Coming Soon</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4vw,42px)',
              fontWeight:'600',color:'#ffffff',marginBottom:'16px',lineHeight:'1.2'}}>
              Real Project Photos Coming Soon
            </h2>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.5)',lineHeight:'1.7',
              maxWidth:'480px',margin:'0 auto 32px'}}>
              We're uploading photos from real installations, showrooms, and completed projects. Check back soon.
            </p>
            <a href="https://wa.me/919216866671?text=I'd like to see your product gallery" target="_blank" className="btn-gold">
              WhatsApp for Photos
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

/* ─── BRANDS PAGE ───────────────────────────────────────── */
const BrandsPage=()=>{
  const [filter,setFilter]=useState('all');
  const filters=[
    {id:'all',label:'All Brands'},
    {id:'hardware',label:'Hardware'},
    {id:'adhesives',label:'Adhesives'},
    {id:'paints',label:'Paints'},
    {id:'tiles',label:'Tiles'},
    {id:'panels',label:'Panels'},
    {id:'tools',label:'Tools'},
    {id:'pipes',label:'Pipes'},
  ];
  const shown=filter==='all'?BRANDS:BRANDS.filter(b=>b.cat===filter);
  const catLabel={hardware:'Hardware',adhesives:'Adhesives',paints:'Paints',
    tiles:'Tiles & Sanitary',panels:'Panels',tools:'Power Tools',pipes:'Pipes'};

  return(
    <div style={{background:'var(--cream)',minHeight:'100vh'}}>
      <PageHero tag="Our Brand Portfolio" title={"30+ Premium Brands.\nAll Under One Roof."}
        sub="Every product genuine, certified, and stocked at our stores."/>
      <div style={{padding:'40px var(--px) 0'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {filters.map(f=>(
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{
              background:filter===f.id?'var(--navy)':'var(--white)',
              border:`1px solid ${filter===f.id?'var(--navy)':'var(--border)'}`,
              borderRadius:'100px',padding:'9px 22px',
              fontSize:'12px',fontWeight:'500',
              fontFamily:'DM Sans,sans-serif',letterSpacing:'0.3px',
              color:filter===f.id?'var(--gold)':'var(--navy)',
              cursor:'pointer',transition:'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:'32px var(--px) 80px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px'}} className="grid-4">
          {shown.map((b,i)=>(
            <Reveal key={i} delay={i*0.03}>
              <div className="card-hover" style={{
                background:'var(--white)',border:'1px solid var(--border)',
                borderRadius:'16px',padding:'34px 24px',
                display:'flex',flexDirection:'column',alignItems:'center',gap:'14px',
              }}>
                <div style={{
                  width:'62px',height:'62px',borderRadius:'15px',
                  background:`linear-gradient(135deg,${catColorMap[b.cat]||'var(--navy)'} 0%,${catColorMap[b.cat]||'var(--navy)'}bb 100%)`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:'var(--gold)',fontFamily:'Cormorant Garamond,serif',
                  fontSize:'18px',fontWeight:'700',
                }}>{b.abbr}</div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'19px',fontWeight:'600',
                  color:'var(--navy)',textAlign:'center'}}>{b.name}</div>
                <div style={{fontSize:'10px',fontWeight:'600',letterSpacing:'1.5px',
                  textTransform:'uppercase',color:catColorMap[b.cat]||'var(--gold)',opacity:0.65}}>
                  {catLabel[b.cat]||b.cat}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── TOOLS PAGE ─────────────────────────────────────────── */
const TileCalculator=()=>{
  const [v,setV]=useState({l:'',w:'',tl:'',tw:'',waste:'10'});
  const [res,setRes]=useState(null);
  const set=k=>e=>setV(p=>({...p,[k]:e.target.value}));
  const calc=()=>{
    const roomArea=parseFloat(v.l)*parseFloat(v.w);
    const tileArea=(parseFloat(v.tl)/100)*(parseFloat(v.tw)/100);
    if(!roomArea||!tileArea)return;
    const waste=parseFloat(v.waste)||10;
    const total=Math.ceil((roomArea/tileArea)*(1+waste/100));
    setRes({area:roomArea.toFixed(2),total,boxes:Math.ceil(total/6),waste});
  };
  const inp={width:'100%',padding:'12px 16px',border:'1px solid var(--border)',borderRadius:'10px',
    fontSize:'14px',fontFamily:'DM Sans,sans-serif',color:'var(--navy)',background:'var(--cream)',outline:'none'};
  const lbl={fontSize:'10px',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',
    color:'var(--navy)',display:'block',marginBottom:'8px',opacity:0.6};
  return(
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}} className="grid-2">
        <div><label style={lbl}>Room Length (m)</label><input style={inp} type="number" placeholder="4.5" value={v.l} onChange={set('l')}/></div>
        <div><label style={lbl}>Room Width (m)</label><input style={inp} type="number" placeholder="3.2" value={v.w} onChange={set('w')}/></div>
        <div><label style={lbl}>Tile Length (cm)</label><input style={inp} type="number" placeholder="60" value={v.tl} onChange={set('tl')}/></div>
        <div><label style={lbl}>Tile Width (cm)</label><input style={inp} type="number" placeholder="60" value={v.tw} onChange={set('tw')}/></div>
        <div style={{gridColumn:'span 2'}}><label style={lbl}>Wastage %</label><input style={inp} type="number" placeholder="10" value={v.waste} onChange={set('waste')}/></div>
      </div>
      <button onClick={calc} className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'15px'}}>Calculate Tiles Needed</button>
      {res&&<div style={{marginTop:'20px',background:'var(--navy)',borderRadius:'14px',padding:'28px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px',textAlign:'center'}}>
          {[{n:`${res.area} m²`,l:'Room Area'},{n:res.total,l:`Tiles (+${res.waste}% waste)`},{n:`~${res.boxes} boxes`,l:'Est. Boxes (6/box)'}].map((r,i)=>(
            <div key={i}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'32px',fontWeight:'700',color:'var(--gold)'}}>{r.n}</div>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:'500'}}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

const PaintCalculator=()=>{
  const [v,setV]=useState({l:'',w:'',h:'',coats:'2',doors:'1',windows:'1'});
  const [res,setRes]=useState(null);
  const set=k=>e=>setV(p=>({...p,[k]:e.target.value}));
  const calc=()=>{
    const L=parseFloat(v.l),W=parseFloat(v.w),H=parseFloat(v.h);
    if(!L||!W||!H)return;
    const net=Math.max(2*(L+W)*H-(parseFloat(v.doors)*1.8)-(parseFloat(v.windows)*1.4),0);
    const coats=parseFloat(v.coats)||2;
    setRes({net:net.toFixed(1),litres:Math.ceil(net*coats/10),primer:Math.ceil(net/12),coats});
  };
  const inp={width:'100%',padding:'12px 16px',border:'1px solid var(--border)',borderRadius:'10px',
    fontSize:'14px',fontFamily:'DM Sans,sans-serif',color:'var(--navy)',background:'var(--cream)',outline:'none'};
  const lbl={fontSize:'10px',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',
    color:'var(--navy)',display:'block',marginBottom:'8px',opacity:0.6};
  return(
    <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'16px'}} className="grid-3">
        <div><label style={lbl}>Length (m)</label><input style={inp} type="number" placeholder="4.5" value={v.l} onChange={set('l')}/></div>
        <div><label style={lbl}>Width (m)</label><input style={inp} type="number" placeholder="3.5" value={v.w} onChange={set('w')}/></div>
        <div><label style={lbl}>Height (m)</label><input style={inp} type="number" placeholder="2.8" value={v.h} onChange={set('h')}/></div>
        <div><label style={lbl}>No. of Coats</label><input style={inp} type="number" placeholder="2" value={v.coats} onChange={set('coats')}/></div>
        <div><label style={lbl}>No. of Doors</label><input style={inp} type="number" placeholder="1" value={v.doors} onChange={set('doors')}/></div>
        <div><label style={lbl}>No. of Windows</label><input style={inp} type="number" placeholder="1" value={v.windows} onChange={set('windows')}/></div>
      </div>
      <button onClick={calc} className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'15px'}}>Calculate Paint Required</button>
      {res&&<div style={{marginTop:'20px',background:'var(--navy)',borderRadius:'14px',padding:'28px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px',textAlign:'center'}}>
          {[{n:`${res.net} m²`,l:'Net Wall Area'},{n:`~${res.litres} L`,l:`Paint (${res.coats} coats)`},{n:`~${res.primer} L`,l:'Primer Required'}].map((r,i)=>(
            <div key={i}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'32px',fontWeight:'700',color:'var(--gold)'}}>{r.n}</div>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:'500'}}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

const BudgetEstimator=()=>{
  const items=[
    {id:'flooring',label:'Flooring (Tiles)',unit:'per sq.ft',low:40,high:120},
    {id:'walls',label:'Wall Tiles / Dado',unit:'per sq.ft',low:35,high:100},
    {id:'paint',label:'Interior Paint',unit:'per sq.ft (wall area)',low:18,high:45},
    {id:'hardware',label:'Kitchen Hardware',unit:'per linear foot',low:500,high:2000},
    {id:'panels',label:'Gypsum / False Ceiling',unit:'per sq.ft',low:60,high:180},
    {id:'plumbing',label:'Plumbing Fittings',unit:'lump sum',low:25000,high:80000},
    {id:'electricals',label:'Electrical Fittings',unit:'lump sum',low:20000,high:60000},
  ];
  const [qty,setQty]=useState({});
  const setQ=k=>e=>setQty(p=>({...p,[k]:e.target.value}));
  const results=items.map(item=>{const q=parseFloat(qty[item.id])||0;return{...item,q,low:Math.round(item.low*q),high:Math.round(item.high*q)};}).filter(r=>r.q>0);
  const totalLow=results.reduce((a,r)=>a+r.low,0);
  const totalHigh=results.reduce((a,r)=>a+r.high,0);
  const fmt=n=>n>=100000?`₹${(n/100000).toFixed(1)}L`:`₹${n.toLocaleString()}`;
  const inp={width:'100%',padding:'11px 14px',border:'1px solid var(--border)',borderRadius:'10px',
    fontSize:'14px',fontFamily:'DM Sans,sans-serif',color:'var(--navy)',background:'var(--cream)',outline:'none'};
  return(
    <div>
      <p style={{fontSize:'13px',color:'var(--txt2)',marginBottom:'20px',lineHeight:'1.6'}}>Enter quantities for each category to get a rough material cost estimate.</p>
      {items.map(item=>(
        <div key={item.id} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'16px',alignItems:'center',
          marginBottom:'12px',background:'var(--white)',border:'1px solid var(--border)',borderRadius:'12px',padding:'16px 20px'}}>
          <div>
            <div style={{fontSize:'14px',fontWeight:'600',color:'var(--navy)',marginBottom:'2px'}}>{item.label}</div>
            <div style={{fontSize:'11px',color:'var(--txt3)'}}>{item.unit} • ₹{item.low}–₹{item.high}</div>
          </div>
          <input style={{...inp,width:'120px',textAlign:'right'}} type="number" placeholder="Qty" value={qty[item.id]||''} onChange={setQ(item.id)}/>
        </div>
      ))}
      {results.length>0&&<div style={{marginTop:'20px',background:'var(--navy)',borderRadius:'14px',padding:'28px 24px'}}>
        {results.map((r,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
            borderBottom:'1px solid rgba(255,255,255,0.07)',paddingBottom:'10px',marginBottom:'10px'}}>
            <span style={{fontSize:'13px',color:'rgba(255,255,255,0.55)'}}>{r.label}</span>
            <span style={{fontSize:'13px',color:'var(--gold)',fontWeight:'600'}}>{fmt(r.low)} – {fmt(r.high)}</span>
          </div>
        ))}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'6px'}}>
          <span style={{fontSize:'15px',fontWeight:'700',color:'#ffffff'}}>Total Estimate</span>
          <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'26px',fontWeight:'700',color:'var(--gold)'}}>{fmt(totalLow)} – {fmt(totalHigh)}</span>
        </div>
      </div>}
    </div>
  );
};

const AdhesiveCalculator=()=>{
  const [v,setV]=useState({area:'',tileSize:'60',type:'ceramic'});
  const [res,setRes]=useState(null);
  const set=k=>e=>setV(p=>({...p,[k]:e.target.value}));
  const types={ceramic:{adh:4.5,grout:0.6},vitrified:{adh:4.2,grout:0.55},marble:{adh:5,grout:0.65}};
  const calc=()=>{
    const area=parseFloat(v.area);if(!area)return;
    const t=types[v.type]||types.ceramic;
    setRes({adh:Math.ceil(area*t.adh/20),grout:Math.ceil(area*t.grout/10)});
  };
  const inp={width:'100%',padding:'12px 16px',border:'1px solid var(--border)',borderRadius:'10px',
    fontSize:'14px',fontFamily:'DM Sans,sans-serif',color:'var(--navy)',background:'var(--cream)',outline:'none'};
  const lbl={fontSize:'10px',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',
    color:'var(--navy)',display:'block',marginBottom:'8px',opacity:0.6};
  return(
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginBottom:'16px'}} className="grid-3">
        <div><label style={lbl}>Area to Tile (sq.ft)</label><input style={inp} type="number" placeholder="200" value={v.area} onChange={set('area')}/></div>
        <div><label style={lbl}>Tile Size</label><select style={inp} value={v.tileSize} onChange={set('tileSize')}><option value="30">30×30 cm</option><option value="60">60×60 cm</option><option value="80">80×80 cm</option><option value="120">120×60 cm</option></select></div>
        <div><label style={lbl}>Tile Type</label><select style={inp} value={v.type} onChange={set('type')}><option value="ceramic">Ceramic</option><option value="vitrified">Vitrified</option><option value="marble">Marble / Stone</option></select></div>
      </div>
      <button onClick={calc} className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'15px'}}>Calculate Adhesive & Grout</button>
      {res&&<div style={{marginTop:'20px',background:'var(--navy)',borderRadius:'14px',padding:'28px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',textAlign:'center'}}>
          {[{n:`${res.adh} bags`,l:'Tile Adhesive (20 kg bags)'},{n:`${res.grout} bags`,l:'Grout (10 kg bags)'}].map((r,i)=>(
            <div key={i}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'36px',fontWeight:'700',color:'var(--gold)'}}>{r.n}</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'6px',fontWeight:'500'}}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

const RenovationChecklist=()=>{
  const sections=[
    {title:'Structure & Walls',items:['Waterproofing (bathrooms/terrace)','Plastering & leveling','Gypsum partition walls','False ceiling / cornice']},
    {title:'Flooring',items:['Floor tiles selection','Wall tiles / dado','Tile adhesive & grout','Tile polishing / sealing']},
    {title:'Kitchen',items:['Modular cabinets hardware','Kitchen tiles & countertop','Kitchen fittings & plumbing','Adhesives for laminate']},
    {title:'Bathrooms',items:['WC & washbasin','Shower / faucets','Bathroom tiles','Waterproofing & sealing']},
    {title:'Paints & Finishes',items:['Wall primer','Interior emulsion paint','Exterior weather coat','Wood polish / enamel']},
    {title:'Electrical & Plumbing',items:['CPVC / uPVC piping','Electrical conduits','Switches & sockets','Water tanks & pumps']},
  ];
  const allItems=sections.flatMap(s=>s.items);
  const [checked,setChecked]=useState({});
  const toggle=item=>setChecked(p=>({...p,[item]:!p[item]}));
  const done=Object.values(checked).filter(Boolean).length;
  const pct=Math.round(done/allItems.length*100);
  return(
    <div>
      <div style={{background:'var(--navy)',borderRadius:'14px',padding:'24px 28px',marginBottom:'24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#ffffff'}}>Renovation Progress</span>
          <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'28px',fontWeight:'700',color:'var(--gold)'}}>{pct}%</span>
        </div>
        <div style={{height:'6px',background:'rgba(255,255,255,0.1)',borderRadius:'3px'}}>
          <div style={{width:`${pct}%`,height:'100%',background:'linear-gradient(90deg,var(--gold),var(--gold3))',borderRadius:'3px',transition:'width 0.4s ease'}}/>
        </div>
        <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',marginTop:'10px'}}>{done} of {allItems.length} tasks completed</p>
      </div>
      {sections.map((s,si)=>(
        <div key={si} style={{marginBottom:'16px',background:'var(--white)',border:'1px solid var(--border)',borderRadius:'14px',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',background:'rgba(13,27,62,0.04)',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:'13px',fontWeight:'700',color:'var(--navy)'}}>{s.title}</span>
          </div>
          {s.items.map((item,ii)=>(
            <div key={ii} onClick={()=>toggle(item)} style={{
              display:'flex',alignItems:'center',gap:'14px',
              padding:'14px 20px',cursor:'pointer',
              borderBottom:ii<s.items.length-1?'1px solid var(--border)':'none',
              background:checked[item]?'rgba(201,168,76,0.04)':'transparent',
              transition:'background 0.15s',
            }}>
              <div style={{width:'20px',height:'20px',borderRadius:'6px',flexShrink:0,
                border:checked[item]?'none':'2px solid rgba(13,27,62,0.2)',
                background:checked[item]?'var(--gold)':'transparent',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'12px',color:'var(--navy)',transition:'all 0.2s'}}>{checked[item]?'✓':''}</div>
              <span style={{fontSize:'14px',color:checked[item]?'var(--txt3)':'var(--navy)',
                textDecoration:checked[item]?'line-through':'none',transition:'all 0.2s'}}>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ToolsPage=()=>{
  const [active,setActive]=useState(0);
  const tools=[
    {name:'Tile Calculator',icon:'◼',desc:'Calculate exact tiles needed with wastage',comp:<TileCalculator/>},
    {name:'Paint Coverage',icon:'🎨',desc:'How much paint for your room',comp:<PaintCalculator/>},
    {name:'Budget Estimator',icon:'₹',desc:'Rough material cost estimate',comp:<BudgetEstimator/>},
    {name:'Adhesive & Grout',icon:'◈',desc:'Bags of adhesive and grout needed',comp:<AdhesiveCalculator/>},
    {name:'Reno Checklist',icon:'✦',desc:'Track your renovation tasks',comp:<RenovationChecklist/>},
  ];
  return(
    <div style={{background:'var(--cream)',minHeight:'100vh'}}>
      <PageHero tag="Professional Tools" title={"Industry Tools\nfor Smarter Projects."}
        sub="Free estimation tools designed for architects, contractors, and homeowners."/>
      <div style={{padding:'56px var(--px) 80px'}}>
        <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:'32px',alignItems:'start'}} className="grid-2">
          <div style={{position:'sticky',top:'100px'}}>
            {tools.map((t,i)=>(
              <div key={i} onClick={()=>setActive(i)} className="card-hover"
                style={{
                  background:active===i?'var(--navy)':'var(--white)',
                  border:`1px solid ${active===i?'var(--navy)':'var(--border)'}`,
                  borderRadius:'14px',padding:'20px 22px',marginBottom:'10px',cursor:'pointer',transition:'all 0.2s',
                }}>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'38px',height:'38px',borderRadius:'10px',flexShrink:0,
                    background:active===i?'rgba(201,168,76,0.15)':'rgba(13,27,62,0.06)',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>{t.icon}</div>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:'700',color:active===i?'#ffffff':'var(--navy)',marginBottom:'2px'}}>{t.name}</div>
                    <div style={{fontSize:'11px',color:active===i?'rgba(255,255,255,0.45)':'var(--txt3)',lineHeight:'1.4'}}>{t.desc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{background:'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 100%)',
              borderRadius:'14px',padding:'24px 22px',marginTop:'8px',textAlign:'center'}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:'var(--navy)',marginBottom:'8px'}}>Need Expert Help?</div>
              <div style={{fontSize:'12px',color:'rgba(13,27,62,0.65)',lineHeight:'1.5',marginBottom:'14px'}}>Our team can verify your estimates.</div>
              <a href="https://wa.me/919216866671" target="_blank" style={{
                display:'block',background:'var(--navy)',color:'var(--gold)',
                padding:'11px',borderRadius:'8px',fontWeight:'700',fontSize:'12px',
                letterSpacing:'1px',textDecoration:'none',textTransform:'uppercase',
              }}>💬 Ask an Expert</a>
            </div>
          </div>
          <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'20px',padding:'44px'}}>
            <div style={{marginBottom:'28px'}}>
              <span style={{fontSize:'11px',fontWeight:'600',letterSpacing:'2px',textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:'8px'}}>
                {tools[active].icon} Tool {active+1} of {tools.length}
              </span>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'34px',fontWeight:'600',color:'var(--navy)',marginBottom:'8px'}}>{tools[active].name}</h2>
              <p style={{fontSize:'13px',color:'var(--txt3)'}}>{tools[active].desc}</p>
            </div>
            <GoldLine my={20}/>
            {tools[active].comp}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── ABOUT PAGE ─────────────────────────────────────────── */
const AboutPage=()=>(
  <div style={{background:'var(--cream)',minHeight:'100vh'}}>
    <PageHero tag="Our Story" title={"Building Trust,\nBuilding Futures."}
      sub="From a single store to the region's most trusted one-stop building solutions provider."/>
    <div style={{padding:'72px var(--px)',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'72px',alignItems:'start'}} className="grid-2">
      <Reveal>
        <div>
          <span className="section-tag">Who We Are</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'36px',fontWeight:'600',color:'var(--navy)',marginBottom:'28px',lineHeight:'1.2'}}>
            The Region's Most Trusted One-Stop Building Partner
          </h2>
          <p style={{fontSize:'16px',color:'var(--txt2)',lineHeight:'1.8',marginBottom:'22px'}}>
            Garg Trading Company was founded with a single, bold vision — to eliminate the chaos of coordinating with a dozen different vendors for a single construction or renovation project.
          </p>
          <p style={{fontSize:'16px',color:'var(--txt2)',lineHeight:'1.8',marginBottom:'22px'}}>
            Today, we carry 30+ of India's and the world's most trusted brands across 7 product categories. From the first nail to the final coat of paint — we supply it all.
          </p>
          <p style={{fontSize:'16px',color:'var(--txt2)',lineHeight:'1.8'}}>
            Our clients — architects, interior designers, builders, and homeowners — trust us for quality, availability, transparent pricing, and a level of service that makes complex projects feel simple.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <ImgPlaceholder h={360} label="Our Store / Team Photo"/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginTop:'12px'}}>
          <ImgPlaceholder h={180} label="Panchkula Store"/>
          <ImgPlaceholder h={180} label="Chandigarh Store"/>
        </div>
      </Reveal>
    </div>
    <div style={{padding:'0 var(--px) 72px'}}>
      {[
        {n:'30+',l:'Premium Brand Partners'},
        {n:'7',l:'Complete Product Categories'},
        {n:'2',l:'Store Locations'},
        {n:'1000s',l:'Projects Supplied Across the Region'},
      ].map((s,i)=>(
        <Reveal key={i} delay={i*0.07}>
          <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'14px',padding:'26px 30px',
            display:'flex',alignItems:'center',gap:'22px',marginBottom:'14px'}}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'46px',fontWeight:'700',color:'var(--gold)',lineHeight:'1',minWidth:'96px'}}>
              <Counter target={s.n}/>
            </div>
            <div style={{fontSize:'16px',fontWeight:'500',color:'var(--navy)'}}>{s.l}</div>
          </div>
        </Reveal>
      ))}
    </div>
    <div style={{padding:'0 var(--px) 72px'}}>
      <Reveal><div style={{textAlign:'center',marginBottom:'44px'}}>
        <span className="section-tag">Our Brands</span>
        <h2 className="section-h">Two Entities. One Commitment.</h2>
      </div></Reveal>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}} className="grid-2">
        {[
          {code:'GT',name:'Garg Trading Company',desc:'The flagship brand for hardware, adhesives, panels, paints, power tools, and complete building solutions.',addr:'Plot No. 1, Industrial Area Phase 1, Panchkula, Haryana 134109',ph:'+91 92168 66671'},
          {code:'GS',name:'Gujarat Tiles & Sanitary Depot',desc:'Specialized in premium tiles and sanitary ware. From designer floor and wall tiles to complete bathroom solutions.',addr:'SCO 22-23, Phase 2, Industrial Area, Chandigarh',ph:'+91 98140 33573'},
        ].map((e,i)=>(
          <Reveal key={i} delay={i*0.1}>
            <div style={{background:'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)',borderRadius:'20px',padding:'52px 46px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:'-28px',right:'-28px',width:'150px',height:'150px',borderRadius:'50%',background:'rgba(201,168,76,0.05)',pointerEvents:'none'}}/>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'58px',fontWeight:'700',color:'var(--gold)',lineHeight:'1',marginBottom:'14px',opacity:'0.2'}}>{e.code}</div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'26px',fontWeight:'600',color:'#ffffff',marginBottom:'18px',lineHeight:'1.2'}}>{e.name}</h3>
              <p style={{fontSize:'14px',color:'rgba(255,255,255,0.52)',lineHeight:'1.72',marginBottom:'28px'}}>{e.desc}</p>
              <GoldLine my={0}/>
              <div style={{paddingTop:'22px'}}>
                <div style={{fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:'1.55',marginBottom:'10px'}}>📍 {e.addr}</div>
                <a href={`tel:${e.ph.replace(/\s/g,'')}`} style={{color:'var(--gold)',fontSize:'15px',fontWeight:'600',textDecoration:'none'}}>📞 {e.ph}</a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
    <div style={{padding:'0 var(--px) 80px'}}>
      <Reveal><div style={{textAlign:'center',marginBottom:'44px'}}>
        <span className="section-tag">What We Stand For</span>
        <h2 className="section-h">Our Core Values</h2>
      </div></Reveal>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="grid-3">
        {[
          {t:'Quality First',d:'We only stock brands we trust completely. Every product must meet the standard we would use in our own homes.'},
          {t:'Customer Centricity',d:'Your project timeline is our priority. Expert specification guidance ensures you make the right decisions every time.'},
          {t:'Integrity Always',d:'Transparent pricing, honest advice, genuine products. No shortcuts, no substitutions, no surprises.'},
        ].map((v,i)=>(
          <Reveal key={i} delay={i*0.08}>
            <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'16px',padding:'40px 32px',borderTop:'3px solid var(--gold)'}}>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'24px',fontWeight:'600',color:'var(--navy)',marginBottom:'14px'}}>{v.t}</h3>
              <p style={{fontSize:'14px',color:'var(--txt2)',lineHeight:'1.7'}}>{v.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
);

/* ─── CONTACT PAGE ───────────────────────────────────────── */
const ContactPage=()=>{
  const [form,setForm]=useState({name:'',phone:'',email:'',category:'',message:''});
  const [sent,setSent]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const submit=e=>{
    e.preventDefault();
    const t=`Hello GT Building Solutions!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0ACategory: ${form.category}%0A%0A${form.message}`;
    window.open(`https://wa.me/919216866671?text=${t}`,'_blank');
    setSent(true);
  };
  const lbl={fontSize:'10px',fontWeight:'600',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--navy)',display:'block',marginBottom:'8px'};
  return(
    <div style={{background:'var(--cream)',minHeight:'100vh'}}>
      <PageHero tag="Get In Touch" title={"Let's Build Something\nTogether."}/>
      <div style={{padding:'64px var(--px) 80px',display:'grid',gridTemplateColumns:'1fr 1.3fr',gap:'56px',alignItems:'start'}} className="grid-2">
        <div>
          {[
            {tag:'Garg Trading Company',name:'Panchkula Store',addr:'Plot No. 1, Industrial Area Phase 1\nPanchkula, Haryana 134109',ph:'+91 92168 66671'},
            {tag:'Gujarat Tiles & Sanitary Depot',name:'Chandigarh Store',addr:'SCO 22-23, Phase 2\nIndustrial Area, Chandigarh',ph:'+91 98140 33573'},
          ].map((l,i)=>(
            <div key={i} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'16px',padding:'34px 32px',marginBottom:'16px'}}>
              <div style={{fontSize:'10px',fontWeight:'600',letterSpacing:'2px',textTransform:'uppercase',color:'var(--gold)',marginBottom:'6px'}}>{l.tag}</div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'22px',fontWeight:'600',color:'var(--navy)',marginBottom:'12px'}}>{l.name}</h3>
              <p style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.6',marginBottom:'14px',whiteSpace:'pre-line'}}>📍 {l.addr}</p>
              <a href={`tel:${l.ph.replace(/\s/g,'')}`} style={{fontSize:'15px',fontWeight:'600',color:'var(--navy)',textDecoration:'none'}}>📞 {l.ph}</a>
            </div>
          ))}
          <div style={{background:'var(--navy)',borderRadius:'16px',padding:'34px 32px'}}>
            <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'22px',fontWeight:'600',color:'#ffffff',marginBottom:'20px'}}>Quick Connect</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <a href="https://wa.me/919216866671" target="_blank" style={{display:'flex',alignItems:'center',gap:'12px',background:'#25D366',color:'#ffffff',padding:'14px 20px',borderRadius:'10px',fontWeight:'600',fontSize:'14px',textDecoration:'none'}}>💬 WhatsApp — +91 92168 66671</a>
              <a href="tel:+919814033573" style={{display:'flex',alignItems:'center',gap:'12px',background:'rgba(201,168,76,0.14)',color:'var(--gold)',padding:'14px 20px',borderRadius:'10px',fontWeight:'600',fontSize:'14px',textDecoration:'none'}}>📞 Call — +91 98140 33573</a>
            </div>
          </div>
          <div style={{marginTop:'16px'}}><ImgPlaceholder h={200} label="Store / Map Image"/></div>
        </div>
        <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'20px',padding:'48px 44px'}}>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'32px',fontWeight:'600',color:'var(--navy)',marginBottom:'8px'}}>Send an Enquiry</h2>
          <p style={{fontSize:'13px',color:'var(--txt3)',marginBottom:'34px'}}>We respond within 2 hours during business hours.</p>
          {sent?(
            <div style={{textAlign:'center',padding:'64px 20px'}}>
              <div style={{fontSize:'52px',marginBottom:'20px'}}>✅</div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'28px',color:'var(--navy)',marginBottom:'12px'}}>Message Sent!</h3>
              <p style={{fontSize:'14px',color:'var(--txt2)'}}>WhatsApp has been opened. Our team will respond shortly.</p>
            </div>
          ):(
            <form onSubmit={submit}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
                <div><label style={lbl}>Your Name *</label><input placeholder="Full name" value={form.name} onChange={set('name')} required/></div>
                <div><label style={lbl}>Phone *</label><input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} required/></div>
              </div>
              <div style={{marginBottom:'20px'}}><label style={lbl}>Email Address</label><input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')}/></div>
              <div style={{marginBottom:'20px'}}><label style={lbl}>Product Category</label>
                <select value={form.category} onChange={set('category')}>
                  <option value="">Select a category</option>
                  {CATS.map(c=><option key={c.id} value={c.label}>{c.label}</option>)}
                  <option value="Multiple Categories">Multiple Categories</option>
                </select>
              </div>
              <div style={{marginBottom:'24px'}}><label style={lbl}>Message *</label>
                <textarea rows={4} placeholder="Describe what you need — quantity, project type, timeline..." value={form.message} onChange={set('message')} required style={{resize:'none'}}/>
              </div>
              <button type="submit" className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'16px'}}>Send via WhatsApp →</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── FOOTER ─────────────────────────────────────────────── */
const Footer=({go})=>(
  <footer style={{background:'#070D1C',padding:'60px var(--px) 28px'}}>
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1.5fr',gap:'48px',marginBottom:'48px'}} className="grid-2">
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
          <div style={{width:'42px',height:'42px',background:'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 100%)',
            borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:'Cormorant Garamond,serif',fontSize:'17px',fontWeight:'700',color:'var(--navy)'}}>GT</div>
          <div>
            <div style={{color:'#ffffff',fontFamily:'Cormorant Garamond,serif',fontSize:'15px',fontWeight:'700'}}>Garg Trading Company</div>
            <div style={{fontSize:'9px',letterSpacing:'2.5px',color:'var(--gold)',textTransform:'uppercase'}}>Building Solutions</div>
          </div>
        </div>
        <p style={{fontSize:'13px',lineHeight:'1.72',maxWidth:'270px',color:'rgba(255,255,255,0.4)',marginBottom:'24px'}}>
          Panchkula & Chandigarh's premier one-stop supplier for all building and hardware materials.
        </p>
        <div style={{display:'flex',gap:'8px'}}>
          {['FB','IG','WA'].map(s=>(
            <div key={s} style={{width:'34px',height:'34px',border:'1px solid rgba(201,168,76,0.2)',
              borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'10px',fontWeight:'700',color:'var(--gold)',cursor:'pointer',
              transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,0.1)';e.currentTarget.style.borderColor='var(--gold)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'}}>{s}</div>
          ))}
        </div>
      </div>
      <div>
        <div style={{color:'#ffffff',fontSize:'11px',fontWeight:'600',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'20px'}}>Navigate</div>
        {['home','products','gallery','brands','tools','about','contact'].map(p=>(
          <div key={p} onClick={()=>go(p)} style={{fontSize:'13px',marginBottom:'12px',cursor:'pointer',textTransform:'capitalize',color:'rgba(255,255,255,0.4)',transition:'color 0.2s'}}
          onMouseEnter={e=>e.target.style.color='var(--gold)'}
          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}>{p}</div>
        ))}
      </div>
      <div>
        <div style={{color:'#ffffff',fontSize:'11px',fontWeight:'600',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'20px'}}>Categories</div>
        {CATS.map(c=>(
          <div key={c.id} onClick={()=>go('cat-'+c.id)} style={{fontSize:'13px',marginBottom:'12px',color:'rgba(255,255,255,0.4)',cursor:'pointer',transition:'color 0.2s'}}
          onMouseEnter={e=>e.target.style.color='var(--gold)'}
          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}>{c.label.split(' ')[0]}</div>
        ))}
      </div>
      <div>
        <div style={{color:'#ffffff',fontSize:'11px',fontWeight:'600',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'20px'}}>Our Stores</div>
        <div style={{fontSize:'13px',marginBottom:'22px',color:'rgba(255,255,255,0.4)',lineHeight:'1.7'}}>
          <div style={{color:'var(--gold)',fontWeight:'600',marginBottom:'4px'}}>Panchkula</div>
          Plot No. 1, Industrial Area Phase 1,<br/>Panchkula, Haryana 134109<br/>
          <a href="tel:+919216866671" style={{color:'var(--gold)',textDecoration:'none',fontWeight:'500'}}>+91 92168 66671</a>
        </div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:'1.7'}}>
          <div style={{color:'var(--gold)',fontWeight:'600',marginBottom:'4px'}}>Chandigarh</div>
          SCO 22-23, Phase 2,<br/>Industrial Area, Chandigarh<br/>
          <a href="tel:+919814033573" style={{color:'var(--gold)',textDecoration:'none',fontWeight:'500'}}>+91 98140 33573</a>
        </div>
      </div>
    </div>
    <div style={{borderTop:'1px solid rgba(201,168,76,0.1)',paddingTop:'24px',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'11px',color:'rgba(255,255,255,0.25)',flexWrap:'wrap',gap:'10px'}}>
      <span>© 2025 Garg Trading Company. All rights reserved.</span>
      <span style={{color:'rgba(201,168,76,0.5)'}}>One Stop Hardware & Building Solutions</span>
    </div>
  </footer>
);

/* ─── WHATSAPP FAB ───────────────────────────────────────── */
const WAB=()=>(
  <a href="https://wa.me/919216866671?text=Hello%20GT%20Building%20Solutions!%20I%20need%20assistance."
    target="_blank"
    style={{position:'fixed',bottom:'28px',right:'28px',zIndex:999,
      width:'58px',height:'58px',background:'#25D366',borderRadius:'50%',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontSize:'26px',textDecoration:'none',
      animation:'pulse 2.2s ease-in-out infinite',transition:'transform 0.25s'}}
    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.12)'}
    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>💬</a>
);

/* ─── APP ────────────────────────────────────────────────── */
const App=()=>{
  const [page,setPage]=useState('home');
  const go=useCallback(p=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'});},[]);
  const catPage=page.startsWith('cat-')?page.slice(4):null;
  const cat=catPage?CATS.find(c=>c.id===catPage):null;
  const pages={home:<HomePage go={go}/>,products:<ProductsPage go={go}/>,gallery:<GalleryPage/>,brands:<BrandsPage/>,tools:<ToolsPage/>,about:<AboutPage/>,contact:<ContactPage/>};
  return(
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marqueeL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes marqueeR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 6px 28px rgba(37,211,102,0.38)}50%{box-shadow:0 6px 44px rgba(37,211,102,0.65)}}
        @keyframes scrollDot{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}
        .marqueeL{animation:marqueeL 38s linear infinite}
        .marqueeR{animation:marqueeR 44s linear infinite}
        .grid-4{display:grid;grid-template-columns:repeat(4,1fr)}
        @media(max-width:900px){.grid-4{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
      <Nav page={page} go={go}/>
      <main key={page} style={{animation:'fadeUp 0.5s cubic-bezier(.22,.68,0,1.1) both'}}>
        {cat?<CategoryPage cat={cat} go={go}/>:(pages[page]||pages.home)}
      </main>
      <Footer go={go}/>
      <WAB/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
