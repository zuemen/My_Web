import styles from "./PepeLabArchitecture.module.css";

/**
 * Drawn from the system as it exists in github.com/zuemen/pepelab_v2 —
 * the three-party SSI flow, the FastAPI issuance and verification session
 * store behind it, the FHIR-path disclosure policy, and the calls out to
 * Taiwan's official digital-credential wallet sandbox.
 *
 * Inline SVG rather than an image file: it stays sharp at any size, inherits
 * the theme tokens, and carries no extra network request.
 */
const PepeLabArchitecture = () => {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroller}>
      <svg
        className={styles.svg}
        viewBox="0 0 880 470"
        role="img"
        aria-labelledby="arch-title arch-desc"
      >
        <title id="arch-title">PepeLab system architecture</title>
        <desc id="arch-desc">
          A hospital issuer sends a credential offer as a QR code to a
          patient-held wallet. The wallet presents a verifiable presentation to
          a verifier — a pharmacy or a research body — which checks it against
          the FastAPI backend. The backend holds the issuance and verification
          session store, applies a disclosure policy addressed by FHIR paths,
          enforces an identity assurance level, and calls Taiwan&rsquo;s
          official issuer and verifier sandboxes.
        </desc>

        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className={styles.arrowHead} />
          </marker>
        </defs>

        {/* ── Row 1: the three SSI roles ── */}
        <g className={styles.node}>
          <rect x="20" y="40" width="220" height="96" rx="8" />
          <text x="130" y="72" className={styles.nodeLabel}>
            Issuer
          </text>
          <text x="130" y="96" className={styles.nodeSub}>
            Hospital
          </text>
          <text x="130" y="118" className={styles.nodeMeta}>
            FHIR Condition · MedicationDispense
          </text>
        </g>

        <g className={styles.node}>
          <rect x="330" y="40" width="220" height="96" rx="8" />
          <text x="440" y="72" className={styles.nodeLabel}>
            Wallet
          </text>
          <text x="440" y="96" className={styles.nodeSub}>
            Patient
          </text>
          <text x="440" y="118" className={styles.nodeMeta}>
            Holder DID · selective disclosure
          </text>
        </g>

        <g className={styles.node}>
          <rect x="640" y="40" width="220" height="96" rx="8" />
          <text x="750" y="72" className={styles.nodeLabel}>
            Verifier
          </text>
          <text x="750" y="96" className={styles.nodeSub}>
            Pharmacy · Research
          </text>
          <text x="750" y="118" className={styles.nodeMeta}>
            Requests a minimum scope
          </text>
        </g>

        {/* Flows between the three roles */}
        <line x1="240" y1="88" x2="322" y2="88" className={styles.edge} markerEnd="url(#arrow)" />
        <text x="281" y="78" className={styles.edgeLabel}>
          QR offer
        </text>

        <line x1="550" y1="88" x2="632" y2="88" className={styles.edge} markerEnd="url(#arrow)" />
        <text x="591" y="78" className={styles.edgeLabel}>
          VP
        </text>

        {/* ── Row 2: backend ── */}
        <line x1="130" y1="136" x2="130" y2="212" className={styles.edge} markerEnd="url(#arrow)" />
        <line x1="750" y1="136" x2="750" y2="212" className={styles.edge} markerEnd="url(#arrow)" />

        <g className={styles.backend}>
          <rect x="20" y="212" width="840" height="118" rx="8" />
        </g>
        <text x="44" y="240" className={styles.backendLabel}>
          FastAPI backend
        </text>

        <g className={styles.chip}>
          <rect x="44" y="256" width="188" height="54" rx="6" />
          <text x="138" y="278" className={styles.chipLabel}>
            Issuance
          </text>
          <text x="138" y="297" className={styles.chipMeta}>
            VC templates
          </text>
        </g>

        <g className={styles.chip}>
          <rect x="248" y="256" width="188" height="54" rx="6" />
          <text x="342" y="278" className={styles.chipLabel}>
            Session store
          </text>
          <text x="342" y="297" className={styles.chipMeta}>
            5-minute QR expiry
          </text>
        </g>

        <g className={styles.chip}>
          <rect x="452" y="256" width="188" height="54" rx="6" />
          <text x="546" y="278" className={styles.chipLabel}>
            Disclosure policy
          </text>
          <text x="546" y="297" className={styles.chipMeta}>
            Fields as FHIR paths
          </text>
        </g>

        <g className={styles.chip}>
          <rect x="656" y="256" width="188" height="54" rx="6" />
          <text x="750" y="278" className={styles.chipLabel}>
            Verification
          </text>
          <text x="750" y="297" className={styles.chipMeta}>
            IAL · scope · field check
          </text>
        </g>

        {/* ── Row 3: government sandbox ── */}
        <line x1="440" y1="330" x2="440" y2="382" className={styles.edge} markerEnd="url(#arrow)" />

        <g className={styles.external}>
          <rect x="180" y="382" width="520" height="68" rx="8" />
          <text x="440" y="410" className={styles.nodeLabel}>
            MODA digital credential wallet sandbox
          </text>
          <text x="440" y="432" className={styles.nodeMeta}>
            issuer-sandbox.wallet.gov.tw · verifier-sandbox.wallet.gov.tw
          </text>
        </g>
      </svg>
      </div>

      <figcaption className={styles.caption}>
        Three scopes are defined — medication pickup, research authorisation and
        insurance application — each mapped to its own verification template and
        a minimum identity assurance level.
      </figcaption>
    </figure>
  );
};

export default PepeLabArchitecture;
