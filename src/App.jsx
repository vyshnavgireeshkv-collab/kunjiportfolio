import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sparkles } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  BriefcaseBusiness,
  BrainCircuit,
  Building2,
  ChevronDown,
  Construction,
  GraduationCap,
  Mail,
  MapPin,
  MonitorCog,
  Phone,
  Sparkles as SparkleIcon,
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const portraitUrl = '/Professional Civil Engineer Portrait.png'
const linkedinUrl = 'https://www.linkedin.com/authwall?trk=gf&trkInfo=AQFheA-an_ys0gAAAaE8DyVgVPbnd1YfMDgczFqoH0qddg8rRp_Z6HN6v-tT3KT4Hck8tByxCzZa6BF_UbFB5d79f5jrhuhmBg0rPbmwEISveF4vgZLMXt6uyQeXpE92Moc3vxU=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fkunjil'

const navItems = [
  { label: 'Explore Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const focusAreas = [
  { icon: Building2, title: 'Civil Engineering', text: 'Structural logic, material behaviour and resilient urban systems.' },
  { icon: Construction, title: 'Structural Systems', text: 'Design thinking rooted in load paths, form and constructability.' },
  { icon: MonitorCog, title: 'Digital Engineering', text: 'Technology-enabled workflows for analysis, modelling and system monitoring.' },
  { icon: BrainCircuit, title: 'Structural Health Monitoring', text: 'Sensor-driven insight, predictive analysis and smarter infrastructure decisions.' },
]

const projectComponents = [
  { title: 'IoT Monitoring', text: 'Distributed sensing and real-time structural data collection.' },
  { title: 'Machine Learning', text: 'Damage prediction and data-driven condition assessment.' },
  { title: 'BIM Integration', text: 'Connected model data for coordination and digital workflows.' },
  { title: 'Digital Twin', text: 'Visualisation of structural behaviour and system status.' },
]

const skillList = [
  'AutoCAD 2D/3D',
  'STAAD.Pro',
  'ETABS',
  'Primavera P6',
  'Adobe Photoshop',
  'Microsoft Office',
  'Basic prompt engineering',
  'AI tools',
]

const experienceEntries = [
  {
    role: 'Structural Engineering Intern',
    employer: 'Optim Engineering Solutions, Cheroor, Thrissur',
    date: '',
  },
  {
    role: 'Civil Engineering Intern',
    employer: 'OLCCS, Mannuthy, Thrissur',
    date: 'May 2023',
  },
]

const educationEntries = [
  { title: 'B.Tech in Civil Engineering', institution: 'Government Engineering College Thrissur', date: '2024–present', score: 'CGPA: 7.41' },
  { title: 'Diploma in Civil Engineering', institution: 'Government Women\'s Polytechnic College Thrissur', date: '2021–2024', score: 'CGPA: 8.81' },
  { title: 'Higher Secondary — Biomaths', institution: 'Kendriya Vidyalaya Thrissur', date: '2019–2021', score: 'Score: 80.5%' },
  { title: 'Secondary Education', institution: 'Vimalagiri Public School', date: '2018–2019', score: 'Score: 93.5%' },
]

const languageList = ['English', 'Hindi', 'Malayalam']

function App() {
  const [portraitError, setPortraitError] = useState(false)
  const journeyRef = useRef({ world: 0, portrait: 0, structure: 0 })
  const portraitImageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      journeyRef.current.reducedMotion = reducedMotion

      if (!reducedMotion) {
        gsap.utils.toArray('.reveal').forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: { trigger: element, start: 'top 84%' },
            },
          )
        })
      }

      ScrollTrigger.create({
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: reducedMotion ? false : 1.2,
        onUpdate: (self) => { journeyRef.current.world = self.progress },
      })

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: reducedMotion ? false : 1,
        onUpdate: (self) => {
          journeyRef.current.portrait = reducedMotion ? 0 : self.progress
          journeyRef.current.structure = reducedMotion ? 0 : self.progress
        },
      })

      if (portraitImageRef.current && !reducedMotion) {
        gsap.to(portraitImageRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark">KL</div>
          <span>KUNJILAKSHMI</span>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="world-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, 1.2, 16], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <fog attach="fog" args={['#DCECF5', 18, 74]} />
          <ambientLight intensity={1.35} color="#F7FAFC" />
          <directionalLight position={[5, 8, 8]} intensity={2.1} color="#FFFFFF" />
          <directionalLight position={[-8, 5, -10]} intensity={1.3} color="#D9F0ED" />
          <pointLight position={[0, 7, -20]} intensity={90} distance={48} color="#B8D9EC" />
          <JourneyScene journeyRef={journeyRef} />
        </Canvas>
      </div>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-copy reveal">
            <p className="eyebrow">STRUCTURAL ENGINEERING · DIGITAL CONSTRUCTION</p>
            <h1>KUNJILAKSHMI</h1>
            <div className="subhead">
              <span>CIVIL ENGINEERING</span>
              <span className="dot">•</span>
              <span>STRUCTURAL SYSTEMS</span>
              <span className="dot">•</span>
              <span>DIGITAL CONSTRUCTION</span>
            </div>

            <p className="intro">
              Civil engineering student exploring structural systems, digital engineering and
              technology-driven approaches to infrastructure design and monitoring.
            </p>

            <div className="cta-row">
              <a href="#projects" className="primary-btn">
                EXPLORE PROJECTS
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="secondary-btn">
                CONTACT
              </a>
            </div>

            <div className="tag-list" aria-label="Engineering focus areas">
              <span>STRUCTURAL ENGINEERING</span>
              <span>DIGITAL ENGINEERING</span>
              <span>BIM / DIGITAL TWIN</span>
              <span>SYSTEM VISUALIZATION</span>
            </div>
          </div>

          <div className="portrait-stage">
            {portraitError ? (
              <div className="portrait-fallback">Portrait image unavailable</div>
            ) : (
              <img
                ref={portraitImageRef}
                src={portraitUrl}
                alt="Kunjilakshmi portrait"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                onError={() => setPortraitError(true)}
              />
            )}
          </div>

          <div className="scroll-indicator" aria-label="Scroll to continue">
            <ChevronDown size={18} />
            <span>Scroll to explore</span>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="section-heading reveal">
            <p className="section-kicker">ABOUT</p>
            <h2>Engineering systems with a digital-first perspective.</h2>
          </div>

          <div className="about-stack reveal">
            <p>
              I am a civil engineering student focused on structural systems, digital engineering,
              and technology-assisted monitoring for resilient infrastructure. My interest lies in
              understanding how modern analysis tools, BIM workflows and monitoring technologies can
              support safer and more informed decision-making in construction and structural
              performance.
            </p>
          </div>

          <div className="feature-grid">
            {focusAreas.map(({ icon: Icon, title, text }) => (
              <article key={title} className="info-card reveal">
                <div className="icon-wrap">
                  <Icon size={18} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section project-section">
          <div className="section-heading reveal">
            <p className="section-kicker">FEATURED PROJECT</p>
            <h2>Development of a Modular Digital Integration Platform for Structural Health Monitoring</h2>
          </div>

          <div className="project-layout reveal">
            <div className="project-copy">
              <p>
                This project explores a modular digital framework that brings together real-time
                structural monitoring, predictive analytics and digital workflows for infrastructure
                assessment. The concept integrates IoT-based sensing, machine-learning-based damage
                prediction, BIM coordination and digital-twin-enabled visualisation to support
                structural health monitoring and predictive maintenance thinking.
              </p>
            </div>

            <div className="system-diagram" aria-label="Project system overview">
              <div className="node node-1">IoT</div>
              <div className="node node-2">ML</div>
              <div className="node node-3">BIM</div>
              <div className="node node-4">Digital Twin</div>
              <div className="core-node">SHM</div>
              <span className="link l1"></span>
              <span className="link l2"></span>
              <span className="link l3"></span>
              <span className="link l4"></span>
            </div>
          </div>

          <div className="project-grid">
            {projectComponents.map((item) => (
              <div key={item.title} className="project-card reveal">
                <div className="card-mark"></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="section-heading reveal">
            <p className="section-kicker">TECHNICAL SKILLS</p>
            <h2>Tools and software for civil and digital engineering workflows.</h2>
          </div>

          <div className="skills-grid reveal">
            {skillList.map((skill) => (
              <div key={skill} className="skill-pill">
                <SparkleIcon size={14} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading reveal">
            <p className="section-kicker">INTERNSHIP EXPERIENCE</p>
            <h2>Professional exposure in engineering practice and site-oriented workflows.</h2>
          </div>

          <div className="timeline reveal">
            {experienceEntries.map((entry) => (
              <article key={entry.role} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-copy">
                  <p className="timeline-tag">{entry.date || 'Internship'}</p>
                  <h3>{entry.role}</h3>
                  <p>{entry.employer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="content-section">
          <div className="section-heading reveal">
            <p className="section-kicker">EDUCATION</p>
            <h2>Academic progression in civil engineering and foundational sciences.</h2>
          </div>

          <div className="education-list reveal">
            {educationEntries.map((entry) => (
              <article key={entry.title} className="education-item">
                <div className="education-icon">
                  <GraduationCap size={18} />
                </div>
                <div className="education-copy">
                  <h3>{entry.title}</h3>
                  <p>{entry.institution}</p>
                </div>
                <div className="education-meta">
                  <span>{entry.date}</span>
                  <strong>{entry.score}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="languages" className="content-section compact-section">
          <div className="section-heading reveal">
            <p className="section-kicker">LANGUAGES</p>
            <h2>Communication and technical engagement.</h2>
          </div>

          <div className="language-row reveal">
            {languageList.map((language) => (
              <div key={language} className="language-pill">
                {language}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="contact-panel reveal">
            <div>
              <p className="section-kicker">CONTACT</p>
              <h2>Open to opportunities in structural engineering and digital construction.</h2>
            </div>

            <div className="contact-grid">
              <a className="contact-item contact-link" href="mailto:kunjilakshmi03@gmail.com">
                <Mail size={18} />
                <div>
                  <span>Email</span>
                  <strong>kunjilakshmi03@gmail.com</strong>
                </div>
              </a>
              <a className="contact-item contact-link" href="tel:7736173672">
                <Phone size={18} />
                <div>
                  <span>Phone</span>
                  <strong>7736173672</strong>
                </div>
              </a>
              <a className="contact-item contact-link" href={linkedinUrl} target="_blank" rel="noreferrer">
                <BriefcaseBusiness size={18} />
                <div>
                  <span>LinkedIn</span>
                  <strong>linkedin.com/in/kunjil</strong>
                </div>
              </a>
              <div className="contact-item">
                <MapPin size={18} />
                <div>
                  <span>Location</span>
                  <strong>Thrissur, Kerala</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function SpaceBackdrop() {
  return (
    <group>
      <Sparkles count={90} scale={[42, 24, 78]} size={2.2} speed={0.12} color="#FFFFFF" />
      <Sparkles count={52} scale={[34, 16, 64]} size={1.7} speed={0.1} color="#8BCBC5" />

      <Float speed={0.35} rotationIntensity={0.05} floatIntensity={0.16} position={[-12, 4, -15]}>
        <mesh rotation={[0.4, 0.8, 0.2]}>
          <icosahedronGeometry args={[2.8, 2]} />
          <meshBasicMaterial color="#D9F0ED" transparent opacity={0.24} />
        </mesh>
      </Float>

      <Float speed={0.3} rotationIntensity={0.04} floatIntensity={0.12} position={[13, -2, -34]}>
        <mesh>
          <icosahedronGeometry args={[3.4, 2]} />
          <meshBasicMaterial color="#E8E6F4" transparent opacity={0.26} />
        </mesh>
      </Float>

      <Float speed={0.28} rotationIntensity={0.035} floatIntensity={0.14} position={[-14, 4, -50]}>
        <mesh>
          <icosahedronGeometry args={[3, 2]} />
          <meshBasicMaterial color="#B7CCBB" transparent opacity={0.22} />
        </mesh>
      </Float>

      <WorldStation position={[-1, 0, -17]} scale={0.7} />
      <WorldStation position={[1.5, -0.2, -43]} scale={0.92} />
      <WorldStation position={[-0.8, 0.2, -64]} scale={1.05} />
    </group>
  )
}

function JourneyScene({ journeyRef }) {
  const path = [
    { at: 0, position: [0, 1.2, 16], target: [0, 0, -1] },
    { at: 0.12, position: [0, 0.6, 10], target: [0, 0, -5] },
    { at: 0.3, position: [-1.2, 0.5, -7], target: [0, 0, -17] },
    { at: 0.52, position: [1.2, 0.2, -25], target: [0, 0, -35] },
    { at: 0.76, position: [-0.8, 0.8, -43], target: [0, 0, -53] },
    { at: 1, position: [0, 0.4, -58], target: [0, 0, -68] },
  ]

  useFrame((state, delta) => {
    const progress = journeyRef.current.world
    let start = path[0]
    let end = path[path.length - 1]

    for (let index = 1; index < path.length; index += 1) {
      if (progress <= path[index].at) {
        start = path[index - 1]
        end = path[index]
        break
      }
    }

    const segmentProgress = Math.max(0, Math.min(1, (progress - start.at) / (end.at - start.at)))
    const ease = segmentProgress * segmentProgress * (3 - 2 * segmentProgress)
    const cameraPosition = start.position.map((value, index) => value + (end.position[index] - value) * ease)
    const cameraTarget = start.target.map((value, index) => value + (end.target[index] - value) * ease)
    const blend = 1 - Math.exp(-delta * 3.5)

    const cameraBlend = journeyRef.current.reducedMotion ? 1 : blend
    state.camera.position.x += (cameraPosition[0] - state.camera.position.x) * cameraBlend
    state.camera.position.y += (cameraPosition[1] - state.camera.position.y) * cameraBlend
    state.camera.position.z += (cameraPosition[2] - state.camera.position.z) * cameraBlend
    state.camera.lookAt(cameraTarget[0], cameraTarget[1], cameraTarget[2])
  })

  return (
    <>
      <SpaceBackdrop />
      <SteelFrame journeyRef={journeyRef} />
      <PortraitParticleCloud journeyRef={journeyRef} />
    </>
  )
}

function WorldStation({ position, scale = 1 }) {
  const levels = [-1.5, 0, 1.5]
  const bays = [-3, -1, 1, 3]
  const depths = [-1.2, 1.2]

  return (
    <group position={position} scale={scale} rotation={[0.08, -0.35, 0]}>
      {bays.flatMap((x) => depths.map((z) => (
        <mesh key={`column-${x}-${z}`} position={[x, 0, z]} castShadow>
          <boxGeometry args={[0.16, 5.2, 0.16]} />
          <meshStandardMaterial color="#8196A2" metalness={0.55} roughness={0.38} />
        </mesh>
      )))}
      {levels.flatMap((y) => depths.map((z) => (
        <mesh key={`beam-${y}-${z}`} position={[0, y, z]} castShadow>
          <boxGeometry args={[6.3, 0.16, 0.16]} />
          <meshStandardMaterial color="#A8BBC4" metalness={0.5} roughness={0.4} />
        </mesh>
      )))}
      {levels.flatMap((y) => bays.map((x) => (
        <mesh key={`cross-beam-${x}-${y}`} position={[x, y, 0]} castShadow>
          <boxGeometry args={[0.16, 0.16, 2.4]} />
          <meshStandardMaterial color="#A8BBC4" metalness={0.5} roughness={0.4} />
        </mesh>
      )))}
      <Line points={[[-3, -1.5, 1.3], [-1, 0, 1.3], [1, -1.5, 1.3], [3, 0, 1.3]]} color="#8BCBC5" opacity={0.76} transparent lineWidth={1.4} />
      <Line points={[[-3, 0, -1.3], [-1, 1.5, -1.3], [1, 0, -1.3], [3, 1.5, -1.3]]} color="#8BCBC5" opacity={0.58} transparent lineWidth={1.2} />
      {[-2, 0, 2].map((x) => (
        <mesh key={`sensor-${x}`} position={[x, 1.65, 1.35]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#8BCBC5" emissive="#8BCBC5" emissiveIntensity={0.22} />
        </mesh>
      ))}
    </group>
  )
}

function PortraitParticleCloud({ journeyRef }) {
  const [particleData, setParticleData] = useState(null)
  const pointsRef = useRef(null)
  const materialRef = useRef(null)

  useEffect(() => {
    const image = new Image()
    image.src = portraitUrl
    image.onload = () => {
      const width = 420
      const height = Math.round(width / (image.width / image.height))
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, width, height)

      const { data } = context.getImageData(0, 0, width, height)
      const positions = []
      const colors = []
      const scattered = []

      for (let y = 0; y < height; y += 5) {
        for (let x = 0; x < width; x += 5) {
          const index = (y * width + x) * 4
          const alpha = data[index + 3]
          if (alpha < 18) continue

          const px = ((x - width / 2) / width) * 4.8
          const py = ((height / 2 - y) / height) * 6.1
          const prevX = px
          const prevY = py
          const prevZ = 0

          positions.push(prevX, prevY, prevZ)
          scattered.push(
            prevX + Math.sin((x + y) * 0.09) * 3.2,
            prevY + Math.cos((x - y) * 0.12) * 2.4,
            Math.sin(x * 0.08 + y * 0.05) * 3.8,
          )

          const r = data[index] / 255
          const g = data[index + 1] / 255
          const b = data[index + 2] / 255
          colors.push(r, g, b)
        }
      }

      setParticleData({
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        scattered: new Float32Array(scattered),
      })
    }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !particleData) return

    const positionBuffer = pointsRef.current.geometry.attributes.position.array
    const { positions, scattered } = particleData
    const progress = journeyRef.current.portrait
    const amount = Math.max(0, Math.min(1, (progress - 0.12) / 0.78))
    const drift = state.clock.elapsedTime * 0.08

    for (let i = 0; i < positions.length; i += 1) {
      const axis = i % 3
      const movement = axis === 0 ? Math.sin(drift + i) * 0.05 : axis === 1 ? Math.cos(drift + i) * 0.04 : 0
      positionBuffer[i] = positions[i] + (scattered[i] - positions[i]) * amount + movement * amount
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0, Math.min(1, (progress - 0.06) * 1.8))
    }
  })

  if (!particleData) return null

  return (
    <points ref={pointsRef} position={[4.3, -0.3, 0]} rotation={[0.08, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  )
}

function SteelFrame({ journeyRef }) {
  const groupRef = useRef()
  const frameMembers = useMemo(
    () => [
      { key: 'col-f-1', position: [-6.4, -0.8, -3.2], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [-1.8, 0.8, -2.4] },
      { key: 'col-f-2', position: [-2.6, -0.8, -3.2], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [-0.8, 0.8, -1.6] },
      { key: 'col-f-3', position: [1.2, -0.8, -3.2], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [0.6, 0.8, -1.3] },
      { key: 'col-f-4', position: [5.0, -0.8, -3.2], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [1.8, 0.8, -1.4] },
      { key: 'col-r-1', position: [-6.4, -0.8, 2.6], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [-1.6, 0.8, 2.0] },
      { key: 'col-r-2', position: [-2.6, -0.8, 2.6], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [-0.8, 0.8, 1.7] },
      { key: 'col-r-3', position: [1.2, -0.8, 2.6], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [0.7, 0.8, 1.5] },
      { key: 'col-r-4', position: [5.0, -0.8, 2.6], size: [0.26, 8.8, 0.26], rotation: [0, 0, 0], offset: [1.9, 0.8, 1.8] },
      { key: 'rear-col-1', position: [-8.6, 0.8, -0.8], size: [0.28, 10.5, 0.28], rotation: [0, 0, 0], offset: [-2.5, 1.3, -2.5] },
      { key: 'rear-col-2', position: [-3.1, 0.8, -0.8], size: [0.28, 10.5, 0.28], rotation: [0, 0, 0], offset: [-1.0, 1.4, -2.0] },
      { key: 'rear-col-3', position: [2.2, 0.8, -0.8], size: [0.28, 10.5, 0.28], rotation: [0, 0, 0], offset: [0.8, 1.4, -1.8] },
      { key: 'rear-col-4', position: [7.4, 0.8, -0.8], size: [0.28, 10.5, 0.28], rotation: [0, 0, 0], offset: [2.4, 1.4, -1.5] },
      { key: 'beam-01', position: [0, 2.8, -3.2], size: [14.8, 0.18, 0.18], rotation: [0, 0, 0], offset: [0.3, 1.6, -2.2] },
      { key: 'beam-02', position: [0, 0.8, -3.2], size: [14.8, 0.18, 0.18], rotation: [0, 0, 0], offset: [0.4, 1.2, -1.5] },
      { key: 'beam-03', position: [0, -1.2, -3.2], size: [14.8, 0.18, 0.18], rotation: [0, 0, 0], offset: [0.5, 0.9, -1.1] },
      { key: 'beam-11', position: [0, 2.8, 2.6], size: [14.8, 0.18, 0.18], rotation: [0, 0, 0], offset: [0.4, 1.6, 1.9] },
      { key: 'beam-12', position: [0, 0.8, 2.6], size: [14.8, 0.18, 0.18], rotation: [0, 0, 0], offset: [0.5, 1.4, 1.6] },
      { key: 'beam-13', position: [0, -1.2, 2.6], size: [14.8, 0.18, 0.18], rotation: [0, 0, 0], offset: [0.5, 0.9, 1.3] },
      { key: 'beam-x-1', position: [-7.1, -0.7, 0], size: [0.18, 6.4, 0.18], rotation: [0, 0, 0.12], offset: [-3.2, 0.8, 0.5] },
      { key: 'beam-x-2', position: [7.1, -0.7, 0], size: [0.18, 6.4, 0.18], rotation: [0, 0, -0.12], offset: [3.2, 0.8, 0.3] },
      { key: 'brace-1', position: [-5.0, 1.0, -2.9], size: [0.16, 5.2, 0.16], rotation: [0, 0, 0.7], offset: [-1.8, 1.8, -1.7] },
      { key: 'brace-2', position: [5.2, 1.0, 2.8], size: [0.16, 5.2, 0.16], rotation: [0, 0, -0.72], offset: [1.9, 1.8, 1.8] },
      { key: 'brace-3', position: [-2.2, 0.5, -0.8], size: [0.16, 5.8, 0.16], rotation: [0, 0, 0.82], offset: [-1.0, 1.5, -1.5] },
      { key: 'brace-4', position: [3.0, 0.5, -0.8], size: [0.16, 5.8, 0.16], rotation: [0, 0, -0.82], offset: [1.1, 1.4, -1.2] },
      { key: 'plate-1', position: [-5.5, 3.2, -0.2], size: [1.2, 0.18, 1.2], rotation: [0, 0, 0], offset: [-2.0, 2.2, -0.5] },
      { key: 'plate-2', position: [-1.5, 3.2, -0.2], size: [1.2, 0.18, 1.2], rotation: [0, 0, 0], offset: [-0.6, 2.0, -0.2] },
      { key: 'plate-3', position: [2.7, 3.2, -0.2], size: [1.2, 0.18, 1.2], rotation: [0, 0, 0], offset: [1.2, 2.1, -0.1] },
      { key: 'plate-4', position: [6.8, 3.2, -0.2], size: [1.2, 0.18, 1.2], rotation: [0, 0, 0], offset: [2.4, 2.0, 0.3] },
      { key: 'base-1', position: [0, -3.8, 0], size: [18.5, 0.34, 8.5], rotation: [0, 0, 0], offset: [0, -0.2, 0] },
    ],
    [],
  )

  const meshRefs = useRef([])

  useFrame((state) => {
    const progress = journeyRef.current.structure

    if (groupRef.current) {
      groupRef.current.rotation.y = 0.4 + Math.sin(state.clock.elapsedTime * 0.08) * 0.08
      groupRef.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }

    frameMembers.forEach((member, index) => {
      const mesh = meshRefs.current[index]
      if (!mesh) return

      const x = member.position[0] + member.offset[0] * progress
      const y = member.position[1] + member.offset[1] * progress
      const z = member.position[2] + member.offset[2] * progress
      mesh.position.set(x, y, z)
      mesh.rotation.set(member.rotation[0], member.rotation[1], member.rotation[2])
    })
  })

  return (
    <group ref={groupRef} position={[0, -0.4, -1.2]} rotation={[0.42, -0.75, 0]} scale={0.72}>
      <gridHelper args={[20, 36, '#7ecfa1', '#25323b']} position={[0, -4.1, 0]} />

      {frameMembers.map((member, index) => (
        <mesh
          key={member.key}
          ref={(node) => {
            meshRefs.current[index] = node
          }}
          position={member.position}
          rotation={member.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry args={member.size} />
          <meshStandardMaterial
            color={index < 24 ? '#dfeaf2' : '#aebdc7'}
            metalness={0.9}
            roughness={0.22}
            emissive="#0b1218"
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}

      <Line points={[[-9.5, -4.1, -5.1], [9.5, -4.1, -5.1]]} color="#8ef0af" lineWidth={1.2} />
      <Line points={[[-9.5, -4.1, 4.8], [9.5, -4.1, 4.8]]} color="#8ef0af" lineWidth={1.2} />
      <Line points={[[-8.8, -4.4, -5.8], [-8.8, -4.4, 5.6]]} color="#8ec6ec" lineWidth={1} />
      <Line points={[[-8.8, -4.4, -5.8], [8.8, -4.4, -5.8]]} color="#8ec6ec" lineWidth={1} />
      <Line points={[[-10, -4.2, 0], [10, -4.2, 0]]} color="#95a4b3" lineWidth={0.8} />
      <Line points={[[0, -4.2, -6.5], [0, 6.2, -6.5]]} color="#9fd8ff" opacity={0.34} transparent lineWidth={0.8} />
      <Line points={[[0, -4.2, 6.2], [0, 6.2, 6.2]]} color="#9fd8ff" opacity={0.22} transparent lineWidth={0.7} />
    </group>
  )
}

export default App
