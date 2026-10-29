import { useEffect, useState, type ReactNode } from "react"

type Page = "inicio" | "nosotros" | "proyectos" | "viaconde" | "colabora" | "impacto"

const NAV: { id: Page label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "proyectos", label: "Proyectos" },
  { id: "viaconde", label: "Via ConDe" },
  { id: "colabora", label: "Colabora" },
  { id: "impacto", label: "Transparencia e impacto" },
]

const CONDE_DEMO_URL = "https://ivory-goshawk-938836.hostingersite.com/#/"
const INSTAGRAM_URL = "https://www.instagram.com/__conderecho/"
const YOUTUBE_URL = "https://www.youtube.com/@ConDerecho"
const EMAIL = "conderechomx@gmail.com"
const SHARE_MESSAGE =
  "ConDerecho busca acercar el conocimiento jurídico a más personas mediante la educación, la divulgación y el trabajo comunitario. Conoce el proyecto y súmate a construir una sociedad más informada."

function useRoute() {
  const route = () => {
    const hash = window.location.hash.replace("#/", "") as Page
    return NAV.some((item) => item.id === hash) ? hash : "inicio"
  }
  const [page, setPage] = useState<Page>(route)

  useEffect(() => {
    const onHash = () => {
      setPage(route())
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  return page
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function SocialIcon({ type }: { type: "instagram" | "youtube" }) {
  if (type === "instagram") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="social-icon-dot" cx="17.5" cy="6.5" r="1" />
      </svg>
    )
  }

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  )
}

function TextLink({
  to,
  children,
  light = false,
}: {
  to: Page
  children: ReactNode
  light?: boolean
}) {
  return (
    <a
      className={`text-link${light ? " text-link--light" : ""}`}
      href={`#/${to}`}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

function DemoLink() {
  return (
    <a
      className="demo-link"
      href={CONDE_DEMO_URL}
      target="_blank"
      rel="noreferrer"
    >
      ¡Visualiza el demo! <Arrow />
    </a>
  )
}

function ExternalLink({
  href,
  children,
  variant = "outline",
}: {
  href: string
  children: ReactNode
  variant?: "solid" | "outline"
}) {
  return (
    <a
      className={`action-link action-link--${variant}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

function ShareAction() {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ConDerecho",
          text: SHARE_MESSAGE,
          url: window.location.origin,
        })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(SHARE_MESSAGE)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = SHARE_MESSAGE
      textArea.setAttribute("readonly", "")
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="share-action">
      <button
        className="action-link action-link--outline"
        type="button"
        onClick={share}
      >
        <span>{copied ? "Mensaje copiado" : "Comparte ConDerecho"}</span>
        <Arrow />
      </button>
      <span className="share-status" aria-live="polite">
        {copied ? "El mensaje se copió al portapapeles." : ""}
      </span>
    </div>
  )
}

function OfficialBrandMark() {
  return (
    <div className="official-brand-mark">
      <span aria-hidden="true" />
      <img
        src="/brand/conderecho-logo.png"
        alt="Logotipo oficial de ConDerecho"
      />
    </div>
  )
}
function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="ConDerecho — Proyectos"
        title={<>Ideas que convierten el conocimiento en acción.</>}
        intro="Nuestras iniciativas responden a distintos contextos y formas de aprender. Todas comparten una misión: hacer el conocimiento jurídico más cercano."
        aside="Digital · Audiovisual · Comunitario"
      />
      <section className="project-features">
        {projectData.map((project) => (
          <article className="project-feature" key={project.number}>
            <div
              className={`feature-image feature-art feature-art--${project.motif}`}
            >
              {project.number === "01" ? (
                <img
                  src="/projects/con_derecho-learning.png"
                  alt="Composición visual para Educación Digital de ConDerecho"
                />
              ) : project.number === "02" ? (
                <img
                  src="/projects/via-conde-comunidad2.jpg"
                  alt="Composición visual para Via Conde Comunidad"
                />
              ) : project.number === "03" ? (
                <img
                  src="/projects/conderecho-podcast.jpg"
                  alt="Integrante de ConDerecho durante una grabación de contenido"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Composición editorial para ${project.name}`}
                >
                  <ProjectMotif type={project.motif} />
                </div>
              )}
              <span>{project.number}</span>
            </div>
            <div className="feature-content">
              <div className="feature-meta">
                <p>{project.name}</p>
                <span>Proyecto {project.number}</span>
              </div>
              <h2>{project.title}</h2>
              <p className="feature-copy">{project.copy}</p>
              <p className="feature-complement">{project.complement}</p>
              {project.number === "01" && (
                <div className="pilot-module">
                  <div>
                    <span>Módulo piloto previsto</span>
                    <h3>La letra chiquita</h3>
                    <p>20 lecciones previstas</p>
                  </div>
                  <ul>
                    {[
                      "Contratos",
                      "Despidos",
                      "Finiquitos",
                      "Compras a crédito",
                      "Deudas",
                      "Informalidad laboral",
                    ].map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.number === "03" && (
                <div className="podcast-launch">
                  <p className="project-status">
                    Próximamente · Estreno: 1 de diciembre de 2026
                  </p>
                  <strong>Un nuevo episodio cada semana</strong>
                  <p>
                    Muy pronto, nuevas conversaciones para conocer, cuestionar y
                    ejercer nuestros derechos.
                  </p>
                </div>
              )}
              {project.number === "01" && <DemoLink />}
              {project.number === "02" && (
                <a className="action-link action-link--dark" href="#/viaconde">
                  <span>{project.label}</span>
                  <Arrow />
                </a>
              )}
              {project.number === "03" && (
                <ExternalLink href={YOUTUBE_URL}>{project.label}</ExternalLink>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="closing-cta">
        <p>Conocer para ejercer.</p>
        <h2>Un ecosistema educativo para acercar el Derecho.</h2>
        <TextLink to="colabora" light>
          Colabora con la misión
        </TextLink>
      </section>
    </>
  );
}
  return (
    <div className="project-motif community-motif" aria-hidden="true">
      <i />
      <i />
      <i />
      <span>Escuchar · compartir · orientar</span>
    </div>
  )
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [page])

  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="#/inicio"
        aria-label="ConDerecho, ir al inicio"
      >
        Con<span>Derecho</span>
      </a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "Cerrar" : "Menú"}</span>
        <span className="menu-mark" aria-hidden="true">
          {open ? "×" : "—"}
        </span>
      </button>
      <nav
        id="main-navigation"
        className={`main-nav${open ? " is-open" : ""}`}
        aria-label="Navegación principal"
      >
        {NAV.map((item) => (
          <a
            key={item.id}
            className={page === item.id ? "active" : ""}
            href={`#/${item.id}`}
            aria-current={page === item.id ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="footer-wordmark">ConDerecho</p>
          <p className="footer-statement">
            El conocimiento jurídico como herramienta de participación y
            transformación social.
          </p>
          <a className="footer-phone" href="tel:+522223342337">
            222 334 2337
          </a>
          <a className="footer-email" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="footer-socials">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <SocialIcon type="instagram" /> Instagram <Arrow />
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer">
              <SocialIcon type="youtube" /> YouTube <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-nav" aria-label="Navegación de pie de página">
          <p className="eyebrow">Explora</p>
          {NAV.slice(1).map((item) => (
            <a key={item.id} href={`#/${item.id}`}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ConDerecho</span>
        <span>Conocer para ejercer</span>
        <span>Sitio institucional</span>
      </div>
    </footer>
  )
}

function SectionIntro({
  number,
  title,
  copy,
}: {
  number: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{number}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  )
}

function PageHero({
  kicker,
  title,
  intro,
  aside,
}: {
  kicker: string
  title: ReactNode
  intro: string
  aside?: string
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <div className="page-hero-copy">
        <p>{intro}</p>
        {aside && <p className="page-hero-aside">{aside}</p>}
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-topline">
          <p>Organización de educación y divulgación jurídica</p>
          <p>Conocer para ejercer</p>
        </div>
        <div className="home-title">
          <div>
            <h1>ConDerecho</h1>
            <p className="hero-manifesto">CONOCE, CUESTIONA, CAMBIA.</p>
            <p className="hero-purpose">
              Acercamos el conocimiento jurídico a más personas para que
              conozcan sus derechos y comprendan cómo ejercerlos.
            </p>
          </div>
          <OfficialBrandMark />
        </div>
        <div className="hero-bottom">
          <p>Una iniciativa de impacto social</p>
          <div className="hero-actions">
            <a className="action-link action-link--accent" href="#/proyectos">
              <span>EXPLORA NUESTROS PROYECTOS</span>
              <Arrow />
            </a>
            <a className="action-link action-link--dark" href="#/nosotros">
              <span>CONOCE ConDerecho</span>
              <Arrow />
            </a>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#inicio-mision">
          <span>Continúa</span>
          <span aria-hidden="true">↓</span>
        </a>
        <span className="hero-index" aria-hidden="true">
          01
        </span>
      </section>

      <section className="mission-panel" id="inicio-mision">
        <SectionIntro
          number="01 — Nuestra misión"
          title="Hacer comprensible lo que nos pertenece a todas las personas."
        />
        <div className="mission-body">
          <p>
            Creemos que conocer nuestros derechos es el primer paso para
            ejercerlos. Por eso construimos espacios y herramientas que traducen
            la complejidad jurídica en conocimiento claro, útil y cercano.
          </p>
          <TextLink to="nosotros">Sobre ConDerecho</TextLink>
        </div>
      </section>

      <section className="projects-preview">
        <SectionIntro
          number="02 — Proyectos"
          title="Tres formas de acercar el Derecho."
          copy="Educación digital, divulgación audiovisual y trabajo comunitario: tres caminos conectados por una misma convicción."
        />
        <div className="preview-list">
          {[
            [
              "01",
              "ConDerecho Learning",
              "Aprende a tu ritmo",
              "Lecciones jurídicas breves e interactivas.",
              "proyectos",
            ],
            [
              "02",
              "Via ConDe",
              "El Derecho llega a la comunidad",
              "Educación jurídica cercana y responsable.",
              "viaconde",
            ],
            [
              "03",
              "ConDerecho Podcast",
              "El conocimiento se comparte",
              "Conversaciones y recursos para comprender el Derecho.",
              "proyectos",
            ],
          ].map(([number, name, title, copy, to]) => (
            <a className="project-row" href={`#/${to}`} key={number}>
              <span className="project-number">{number}</span>
              <div>
                <p className="project-name">{name}</p>
                <h3>{title}</h3>
              </div>
              <p>{copy}</p>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="allies-section" id="aliados">
        <div>
          <p className="eyebrow">03 — Colaboración institucional</p>
          <h2>Nuestros aliados</h2>
        </div>
        <div className="ally-name">
          <span>Aliado confirmado</span>
          <a
            href="http://solvexsoluciones.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visitar el sitio web de Solvex Soluciones"
          >
            <img src="/allies/solvex-soluciones.png" alt="Solvex Soluciones" />
            <p>Solvex Soluciones</p>
          </a>
        </div>
      </section>

      <section className="social-band">
        <div>
          <p className="eyebrow">Conversemos</p>
          <h2>El conocimiento también se comparte en comunidad.</h2>
        </div>
        <div className="social-actions">
          <ExternalLink href={INSTAGRAM_URL} variant="solid">
            <SocialIcon type="instagram" /> Síguenos en Instagram
          </ExternalLink>
          <ExternalLink href={YOUTUBE_URL}>
            <SocialIcon type="youtube" /> Visita YouTube
          </ExternalLink>
        </div>
      </section>

      <section className="vision-quote">
        <p className="eyebrow">04 — Nuestra visión</p>
        <blockquote>
          Que comprender el Derecho no sea un privilegio, sino una posibilidad{" "}
          <em>al alcance de todas las personas.</em>
        </blockquote>
      </section>

      <section className="participate-split">
        <div>
          <p className="eyebrow">05 — Participa</p>
          <h2>El conocimiento crece cuando se construye en conjunto.</h2>
        </div>
        <div>
          <p>
            Estudiantes, docentes, universidades, organizaciones y personas
            comprometidas pueden sumar experiencia, tiempo y nuevas
            perspectivas.
          </p>
          <TextLink to="colabora">Formas de colaborar</TextLink>
        </div>
      </section>

      <section className="closing-cta">
        <p>Conocer transforma la manera en que participamos.</p>
        <h2>Hagamos del Derecho un conocimiento compartido.</h2>
        <TextLink to="colabora" light>
          Súmate a la misión
        </TextLink>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        kicker="ConDerecho — Nosotros"
        title={<>Conocer es un paso para comprender y ejercer.</>}
        intro="ConDerecho busca reducir la distancia entre los derechos reconocidos por la ley y la capacidad de las personas para conocerlos, comprenderlos y entender cómo ejercerlos."
        aside="Educación · Divulgación · Participación"
      />
      <section className="editorial-grid">
        <p className="eyebrow">01 — Por qué existimos</p>
        <h2>
          La distancia entre las leyes y la vida cotidiana no debería ser
          insuperable.
        </h2>
        <div className="long-copy">
          <p>
            El acceso al conocimiento jurídico fortalece la participación
            ciudadana y permite tomar decisiones con mayor información.
          </p>
          <p>
            Trabajamos desde la educación digital, la divulgación y el trabajo
            comunitario para explicar, compartir y crear espacios de aprendizaje
            responsable.
          </p>
        </div>
      </section>
      <section className="mission-vision-grid">
        <article>
          <span>01</span>
          <h2>Misión</h2>
          <p>
            Acercar el conocimiento jurídico a todas las personas mediante
            experiencias educativas claras, accesibles y responsables.
          </p>
        </article>
        <article className="dark">
          <span>02</span>
          <h2>Visión</h2>
          <p>
            Una sociedad en la que comprender los derechos fortalezca la
            participación, la autonomía y la vida en comunidad.
          </p>
        </article>
      </section>
      <section className="values-section">
        <SectionIntro
          number="02 — Principios"
          title="La forma en que hacemos las cosas importa."
        />
        <div className="values-list">
          {[
            [
              "Claridad",
              "Explicamos sin simplificar en exceso y sin hacer inaccesible lo importante.",
            ],
            [
              "Responsabilidad",
              "Diferenciamos la educación jurídica de la asesoría y la representación profesional.",
            ],
            [
              "Accesibilidad",
              "Diseñamos contenidos y experiencias que puedan comprender distintas personas.",
            ],
            [
              "Colaboración",
              "Reconocemos el valor de aprender, revisar y construir en comunidad.",
            ],
            [
              "Rigor",
              "Aspiramos a que toda información compartida tenga fundamento y acompañamiento académico.",
            ],
          ].map(([title, copy], index) => (
            <div className="value-row" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="team-placeholder">
        <div className="founder-portrait">
          <img
            src="/team/valeria-garcia-torres.jpg"
            alt="Valeria García Torres en la sede de las Naciones Unidas"
          />
        </div>
        <div className="founder-content">
          <p className="eyebrow">03 — Fundadora</p>
          <h2>Valeria García Torres</h2>
          <p className="founder-role">Fundadora de ConDerecho</p>
          <p>
            Valeria García Torres es estudiante de último semestre de Prepa Tec,
            fundadora de ConDerecho y de Youth Muners, ganadora nacional de
            oratoria, muner y embajadora de relaciones públicas de MUNYCH.
          </p>
        </div>
      </section>
      <section className="team-section">
        <div className="team-heading">
          <p className="eyebrow">04 — Equipo</p>
          <h2>Personas que hacen posible ConDerecho.</h2>
          <p>
            Un equipo joven que suma experiencia en finanzas, responsabilidad
            social, Derecho y producción audiovisual.
          </p>
        </div>
        <div className="team-grid">
          {[
            [
              "José Leonardo Nava Bagatella",
              "Encargado de Finanzas.",
              "/team/jose-leonardo-nava.jpg",
              "José Leonardo Nava Bagatella",
            ],
            [
              "Víctor Medina Vivar",
              "Responsable de Responsabilidad Social y Área Jurídica.",
              "/team/victor-medina-vivar.jpg",
              "Víctor Medina Vivar en una cancha de fútbol americano",
            ],
            [
              "Ernesto Maurizio Orduña Rojas",
              "Equipo de apoyo y edición de video.",
              "/team/ernesto-orduna-rojas.jpg",
              "Ernesto Maurizio Orduña Rojas",
            ],
          ].map(([name, role, photo, alt], index) => (
            <article className="team-card" key={name}>
              {photo ? (
                <div className={`team-photo team-photo--${index + 1}`}>
                  <img src={photo} alt={alt} />
                </div>
              ) : (
                <div
                  className="team-photo-placeholder team-photo-placeholder--3"
                  role="img"
                  aria-label={`Retrato de ${name} pendiente de incorporar`}
                >
                  <span>Retrato próximamente</span>
                </div>
              )}
              <div>
                <span>0{index + 1}</span>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="advisor-section">
        <div className="advisor-intro">
          <div className="advisor-portrait">
            <img
              src="/team/gabriela-moreno-valle.jpg"
              alt="Dra. Gabriela Moreno Valle Bautista"
            />
          </div>
          <div>
            <p className="eyebrow">05 — Asesoría académica</p>
            <h2>Dra. Gabriela Moreno Valle Bautista</h2>
            <p className="advisor-role">Asesora académica</p>
            <p>
              La Dra. Gabriela Moreno Valle Bautista es doctora en Derecho por
              la Universidad Autónoma de Tlaxcala y cuenta con una trayectoria
              académica especializada en Derecho Empresarial, asesoría jurídica
              de empresas, derechos humanos y formación docente.
            </p>
          </div>
        </div>
        <div className="advisor-details">
          <article>
            <span>01</span>
            <h3>Formación académica</h3>
            <p>
              Maestría en Derecho Empresarial por la Universidad Iberoamericana;
              máster en Asesoría Jurídica de Empresas por la Universidad Carlos
              III de Madrid; y máster en Formación Docente y Habilidades para la
              Enseñanza Universitaria por la Universidad Anáhuac, Puebla.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Especializaciones</h3>
            <p>
              Educación para la Ciudadanía y los Derechos Humanos por la
              Universidad Carlos III de Madrid y Derechos Humanos por la
              Universidad Complutense de Madrid.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Certificaciones</h3>
            <p>
              Conflictos Laborales por la Organización Internacional del Trabajo
              (OIT), en Turín, Italia, y Compliance Officer por la Universidad
              de Salamanca, España.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>Experiencia profesional</h3>
            <p>
              Ha participado como ponente en los diplomados de Derechos Humanos
              y de Juicio de Amparo organizados por la Casa de la Cultura
              Jurídica de la Suprema Corte de Justicia de la Nación, en las
              sedes de Puebla, Cuernavaca, Chetumal, Tlaxcala y Oaxaca.
            </p>
            <p>
              Asimismo, laboró durante más de 17 años en el Poder Judicial de la
              Federación como Secretaria de Estudio del Primer Tribunal
              Colegiado en Materia de Trabajo del Sexto Circuito.
            </p>
          </article>
        </div>
      </section>
      <section className="closing-cta">
        <p>Tres iniciativas, una misma dirección.</p>
        <h2>Educación jurídica para aprender, compartir y participar.</h2>
        <TextLink to="proyectos" light>
          Conoce los proyectos
        </TextLink>
      </section>
    </>
  )
}

const projectData = [
  {
    number: "01",
    name: "ConDerecho Learning",
    title: "Aprender para ejercer.",
    copy: "Aplicación móvil de educación jurídica con lecciones breves e interactivas para aprender sobre derechos, leyes, procesos e instituciones.",
    complement:
      "El proyecto busca convertir temas jurídicos en experiencias de aprendizaje accesibles y fáciles de comprender.",
    motif: "learning" as const,
    label: "¡Visualiza el demo!",
  },
  {
    number: "02",
    name: "Via ConDe",
    title: "El Derecho llega a la comunidad.",
    copy: "Brigadas de información sobre derechos para comunidades que enfrentan barreras para acceder al conocimiento jurídico.",
    complement:
      "La iniciativa contempla actividades educativas e informativas con participación estudiantil y acompañamiento académico. Su propósito es acercar información general y recursos útiles, sin ofrecer representación jurídica ni presentarse como sustituto de asesoría profesional.",
    motif: "community" as const,
    label: "Conoce las brigadas",
  },
  {
    number: "03",
    name: "ConDerecho Podcast",
    title: "El Derecho también se conversa.",
    copy: "Un espacio audiovisual que convierte temas del Derecho en conversaciones claras, útiles y accesibles para más personas.",
    complement:
      "A través de episodios semanales, abordaremos temas jurídicos de interés cotidiano para ayudar a nuestra audiencia a conocer sus derechos, comprender cuestiones legales que le rodean y mantenerse informada. Queremos acercar el Derecho a la vida diaria, abrir conversaciones y demostrar que el conocimiento jurídico puede comunicarse de manera clara y accesible.",
    motif: "podcast" as const,
    label: "Explora el canal",
  },
]

function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="ConDerecho — Proyectos"
        title={<>Ideas que convierten el conocimiento en acción.</>}
        intro="Nuestras iniciativas responden a distintos contextos y formas de aprender. Todas comparten una misión: hacer el conocimiento jurídico más cercano."
        aside="Digital · Audiovisual · Comunitario"
      />
      <section className="project-features">
        {projectData.map((project) => (
          <article className="project-feature" key={project.number}>
            <div
              className={`feature-image feature-art feature-art--${project.motif}`}
            >
              {project.number === "03" ? (
                <img
                  src="/projects/conderecho-podcast.jpg"
                  alt="Integrante de ConDerecho durante una grabación de contenido"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Composición editorial para ${project.name}`}
                >
                  <ProjectMotif type={project.motif} />
                </div>
              )}
              <span>{project.number}</span>
            </div>
            <div className="feature-content">
              <div className="feature-meta">
                <p>{project.name}</p>
                <span>Proyecto {project.number}</span>
              </div>
              <h2>{project.title}</h2>
              <p className="feature-copy">{project.copy}</p>
              <p className="feature-complement">{project.complement}</p>
              {project.number === "01" && (
                <div className="pilot-module">
                  <div>
                    <span>Módulo piloto previsto</span>
                    <h3>La letra chiquita</h3>
                    <p>20 lecciones previstas</p>
                  </div>
                  <ul>
                    {[
                      "Contratos",
                      "Despidos",
                      "Finiquitos",
                      "Compras a crédito",
                      "Deudas",
                      "Informalidad laboral",
                    ].map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.number === "03" && (
                <div className="podcast-launch">
                  <p className="project-status">
                    Próximamente · Estreno: 1 de diciembre de 2026
                  </p>
                  <strong>Un nuevo episodio cada semana</strong>
                  <p>
                    Muy pronto, nuevas conversaciones para conocer, cuestionar y
                    ejercer nuestros derechos.
                  </p>
                </div>
              )}
              {project.number === "01" && <DemoLink />}
              {project.number === "02" && (
                <a className="action-link action-link--dark" href="#/viaconde">
                  <span>{project.label}</span>
                  <Arrow />
                </a>
              )}
              {project.number === "03" && (
                <ExternalLink href={YOUTUBE_URL}>{project.label}</ExternalLink>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="closing-cta">
        <p>Conocer para ejercer.</p>
        <h2>Un ecosistema educativo para acercar el Derecho.</h2>
        <TextLink to="colabora" light>
          Colabora con la misión
        </TextLink>
      </section>
    </>
  )
}

function ViaCondePage() {
  return (
    <>
      <section className="via-hero">
        <div className="via-title">
          <p className="eyebrow">Una iniciativa de ConDerecho</p>
          <h1>
            Via
            <br />
            ConDe
          </h1>
          <p>Educación jurídica que se encuentra con la comunidad.</p>
        </div>
        <div className="via-image">
          <img
            src="/projects/via-conde-comunidad.jpg"
            alt="Grupo reunido durante una actividad comunitaria"
          />
          <span>Educación jurídica comunitaria</span>
        </div>
      </section>
      <section className="editorial-grid">
        <p className="eyebrow">01 — Próximamente · 2027</p>
        <h2>El conocimiento jurídico también debe llegar a las comunidades.</h2>
        <div className="long-copy">
          <p>
            Via ConDe nace con el propósito de acercar información jurídica
            clara y accesible a comunidades que enfrentan barreras para conocer
            sus derechos y comprender cómo ejercerlos.
          </p>
          <p>
            Mediante brigadas comunitarias, buscamos crear espacios de
            aprendizaje, diálogo y participación en los que las personas puedan
            conocer información útil sobre sus derechos y plantear dudas
            generales relacionadas con temas jurídicos de su vida cotidiana.
          </p>
        </div>
      </section>
      <section className="process-section">
        <SectionIntro
          number="02 — Cómo funciona"
          title="Cada jornada se prepara con intención."
        />
        <div className="process-list">
          {[
            [
              "01",
              "Escuchamos",
              "Reconocemos el contexto y las necesidades informativas de cada comunidad.",
            ],
            [
              "02",
              "Preparamos",
              "Seleccionamos temas y desarrollamos materiales claros, pertinentes y revisados.",
            ],
            [
              "03",
              "Acompañamos",
              "Organizamos a estudiantes con apoyo y supervisión académica.",
            ],
            [
              "04",
              "Compartimos",
              "Realizamos actividades educativas y atendemos dudas informativas generales.",
            ],
            [
              "05",
              "Aprendemos",
              "Recuperamos hallazgos para mejorar las jornadas futuras.",
            ],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="activities-section">
        <div>
          <p className="eyebrow">03 — El modelo</p>
          <h2>Tres formas de aprender y construir en comunidad.</h2>
        </div>
        <div className="activity-blocks">
          <article>
            <span>01</span>
            <h3>Acercamos el conocimiento</h3>
            <p>
              Pláticas informativas y actividades educativas sobre temas
              jurídicos relevantes para la vida cotidiana.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Abrimos espacios para resolver dudas</h3>
            <p>
              Diálogo y participación para compartir información general sobre
              derechos, instituciones y recursos disponibles.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Construimos en comunidad</h3>
            <p>
              Participación de estudiantes de Derecho, profesores, voluntarios y
              colaboradores, con acompañamiento académico.
            </p>
          </article>
        </div>
      </section>
      <section className="responsibility-panel">
        <p className="eyebrow">04 — Nuestro enfoque</p>
        <h2>Educar con claridad también significa reconocer los límites.</h2>
        <div>
          <p>
            Via ConDe tiene una finalidad educativa e informativa. No ofrece
            asesoría jurídica, no sustituye una valoración profesional y no
            brinda representación legal.
          </p>
          <p>
            Las situaciones que requieran atención especializada deberán
            canalizarse a servicios o profesionales correspondientes, de acuerdo
            con los protocolos que establezca la organización.
          </p>
        </div>
      </section>
      <section className="academic-section">
        <SectionIntro
          number="05 — Participación académica"
          title="Aprender enseñando. Enseñar con acompañamiento."
          copy="La participación estudiantil se articula con la orientación de docentes y especialistas. Esta relación busca fortalecer tanto la formación de quienes participan como la calidad de la información compartida."
        />
      </section>
      <section className="first-brigade">
        <div className="first-brigade-heading">
          <p className="eyebrow">06 — Primera brigada Via ConDe</p>
          <span className="coming-label">Próximamente · 2027</span>
          <h2>Xacxamayo, Puebla.</h2>
        </div>
        <div className="brigade-details">
          <dl>
            <div>
              <dt>Comunidad</dt>
              <dd>Xacxamayo, Puebla</dd>
            </div>
            <div>
              <dt>Año programado</dt>
              <dd>2027</dd>
            </div>
            <div>
              <dt>Estatus</dt>
              <dd>Próximamente</dd>
            </div>
          </dl>
          <p>
            Estamos preparando nuestra primera brigada para acercar el
            conocimiento jurídico a la comunidad de Xacxamayo. Muy pronto
            compartiremos más información sobre la convocatoria y las formas de
            participar.
          </p>
          <blockquote>
            Una primera brigada. Un propósito compartido: acercar el
            conocimiento jurídico a más personas.
          </blockquote>
          <button className="disabled-action" type="button" disabled>
            Quiero participar en la primera brigada
            <span>Próximamente</span>
          </button>
          <p className="brigade-note">
            Muy pronto publicaremos la convocatoria y el formulario de registro
            para participar.
          </p>
        </div>
      </section>
      <section className="closing-cta">
        <p>Estudiantes · Docentes · Universidades · Comunidades</p>
        <h2>
          Via ConDe se construye con quienes quieren acercar el conocimiento.
        </h2>
        <TextLink to="colabora" light>
          Conoce cómo sumarte
        </TextLink>
      </section>
    </>
  )
}

function CollaboratePage() {
  const opportunities = [
    {
      number: "01",
      title: "Voluntariado",
      copy: "Pon tus habilidades al servicio de la comunidad. Participa en actividades de difusión, creación de contenido, organización de iniciativas y futuras brigadas de Via ConDe.",
      label: "Quiero ser voluntario",
      href: "https://forms.cloud.microsoft/r/616buC1qnM",
    },
    {
      number: "02",
      title: "Colaboración especializada",
      copy: "Comparte tus conocimientos y experiencia para contribuir a la creación de contenidos educativos, la investigación, la revisión jurídica de materiales o las conversaciones de nuestro podcast.",
      label: "Quiero colaborar",
      href: "https://forms.cloud.microsoft/r/W6iPckkXyt",
    },
    {
      number: "03",
      title: "Alianzas institucionales",
      copy: "¿Representas una universidad, empresa, asociación civil u otra institución? Exploremos oportunidades para desarrollar iniciativas educativas y comunitarias en conjunto.",
      label: "Propón una alianza",
      href: "https://forms.cloud.microsoft/r/vqeq3V3rEe",
    },
  ]
  return (
    <>
      <PageHero
        kicker="ConDerecho — Colabora"
        title={<>Súmate a ConDerecho.</>}
        intro="El conocimiento de tus derechos no debería ser un privilegio. Hay muchas maneras de ayudarnos a acercarlo a más personas. Comparte tus ideas, tus conocimientos o tu tiempo y construyamos juntos una sociedad más informada."
        aside="Conocimiento · Comunidad · Acción"
      />
      <section className="opportunities-grid">
        {opportunities.map((opportunity) => (
          <article key={opportunity.number}>
            <span>{opportunity.number}</span>
            <h2>{opportunity.title}</h2>
            <p>{opportunity.copy}</p>
            <ExternalLink href={opportunity.href}>
              {opportunity.label}
            </ExternalLink>
          </article>
        ))}
        <article className="diffusion-card">
          <span>04</span>
          <h2>Difusión</h2>
          <p>
            Ayúdanos a que más personas conozcan ConDerecho, sus recursos
            educativos, sus proyectos y sus iniciativas para acercar el
            conocimiento jurídico a la comunidad.
          </p>
          <div className="diffusion-actions">
            <ExternalLink href={INSTAGRAM_URL}>
              <SocialIcon type="instagram" /> Sigue nuestro Instagram
            </ExternalLink>
            <ExternalLink href={YOUTUBE_URL}>
              <SocialIcon type="youtube" /> Explora nuestro canal
            </ExternalLink>
            <ShareAction />
          </div>
        </article>
      </section>
      <section className="other-proposal">
        <p className="eyebrow">¿Tienes otra propuesta?</p>
        <h2>Nos encantará conocerla.</h2>
        <p>
          Si tienes una idea, una iniciativa o una forma diferente de colaborar
          con ConDerecho, nos encantará conocerla.
        </p>
        <a className="action-link action-link--solid" href={`mailto:${EMAIL}`}>
          <span>Escríbenos</span>
          <Arrow />
        </a>
      </section>
      <section className="closing-cta">
        <p>Cada acción cuenta cuando el conocimiento se comparte.</p>
        <h2>Conoce, cuestiona, cambia.</h2>
        <TextLink to="proyectos" light>
          Conoce nuestros proyectos
        </TextLink>
      </section>
    </>
  )
}

function ImpactPage() {
  return (
    <>
      <PageHero
        kicker="ConDerecho — Transparencia e impacto"
        title={<>Medir, documentar y compartir con responsabilidad.</>}
        intro="Este espacio concentrará información verificable sobre nuestras actividades, resultados, recursos y avances."
        aside="La confianza se construye con claridad."
      />
      <section className="impact-intro">
        <p className="eyebrow">A — El problema</p>
        <h2>El problema en cifras.</h2>
        <p>
          Estas estadísticas son antecedentes del problema y conservan su
          periodo de referencia. No representan resultados de ConDerecho ni se
          presentan como datos actuales.
        </p>
      </section>
      <section className="problem-stats" aria-label="Estadísticas de contexto">
        {[
          {
            value: "56.1%",
            copy: "De las personas encuestadas declaró saber poco sobre la Constitución.",
            period: "Periodo de referencia: 2017",
            source:
              "Fuente: Tercera Encuesta Nacional de Cultura Constitucional de la UNAM, 2017.",
          },
          {
            value: "84%",
            copy: "Consideró que la Constitución se cumple poco o nada.",
            period: "Periodo de referencia: 2017",
            source:
              "Fuente: Tercera Encuesta Nacional de Cultura Constitucional de la UNAM, 2017.",
          },
          {
            value: "70.3%",
            copy: "De la población ocupada en Puebla trabajaba en la informalidad durante el segundo trimestre de 2026.",
            period: "Periodo de referencia: segundo trimestre de 2026",
            source:
              "Fuente: INEGI, Encuesta Nacional de Ocupación y Empleo (ENOE), segundo trimestre de 2026.",
          },
        ].map((stat, index) => (
          <article key={stat.value}>
            <span>0{index + 1}</span>
            <strong>{stat.value}</strong>
            <p>{stat.copy}</p>
            <div className="stat-source">
              <span>{stat.period}</span>
              <cite>{stat.source}</cite>
              <small>Referencia bibliográfica completa: por incorporar.</small>
            </div>
          </article>
        ))}
      </section>
      <section className="pilot-goals">
        <div className="pilot-goals-heading">
          <p className="eyebrow">B — Objetivo del piloto</p>
          <h2>Metas propuestas de ConDerecho Learning.</h2>
          <p>
            Los siguientes indicadores son objetivos futuros del piloto. No
            representan resultados alcanzados ni porcentajes de avance.
          </p>
        </div>
        <div className="goals-grid">
          {[
            ["1,000", "Usuarios", "Meta de alcance."],
            [
              "30%",
              "Finalización",
              "Meta de usuarios que completen el módulo.",
            ],
            [
              "30%",
              "Mejora en conocimientos",
              "Meta de mejora entre la evaluación inicial y la final.",
            ],
            [
              "200",
              "Consultas",
              "Meta de búsquedas en el directorio de recursos o instituciones.",
            ],
            [
              "100%",
              "Lecciones validadas",
              "Meta de validación de contenidos por profesionales del área jurídica.",
            ],
          ].map(([value, title, copy]) => (
            <article key={title}>
              <span>Meta propuesta · Por alcanzar</span>
              <strong>{value}</strong>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="future-results">
        <div>
          <p className="eyebrow">C — Resultados futuros</p>
          <h2>Publicaremos evidencia cuando exista.</h2>
        </div>
        <div className="future-results-card">
          <p>
            Esta estructura queda preparada para incorporar resultados
            verificables del piloto sin confundir metas con logros.
          </p>
          <dl>
            <div>
              <dt>Resultados verificables</dt>
              <dd>Información por incorporar cuando exista.</dd>
            </div>
            <div>
              <dt>Fecha de medición</dt>
              <dd>Pendiente de medición.</dd>
            </div>
            <div>
              <dt>Metodología</dt>
              <dd>Pendiente de publicación.</dd>
            </div>
            <div>
              <dt>Fuentes</dt>
              <dd>Pendientes de publicación.</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="method-panel">
        <p className="eyebrow">Criterios de publicación</p>
        <div>
          <h2>Información verificable, comprensible y oportuna.</h2>
          <p>
            ConDerecho no presenta cifras preliminares como resultados ni
            atribuye impacto sin evidencia, periodo de medición, metodología y
            fuentes identificables.
          </p>
        </div>
      </section>
    </>
  )
}

function App() {
  const page = useRoute()
  useEffect(() => {
    const elements = document.querySelectorAll(
      "main section, .project-feature, .value-row",
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )

    elements.forEach((element) => {
      element.classList.add("reveal-item")
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [page])

  const content: Record<Page, ReactNode> = {
    inicio: <HomePage />,
    nosotros: <AboutPage />,
    proyectos: <ProjectsPage />,
    viaconde: <ViaCondePage />,
    colabora: <CollaboratePage />,
    impacto: <ImpactPage />,
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        Saltar al contenido
      </a>
      <Header page={page} />
      <main id="content" key={page}>
        {content[page]}
      </main>
      <Footer />
    </div>
  )
}

export default App
