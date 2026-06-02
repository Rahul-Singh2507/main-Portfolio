const FOCUS_ITEMS = ["FULL-STACK", "GEN AI", "LLM APPS", "PERFORMANCE"]
const TOOLS_ITEMS = ["REACT", "NODE.JS", "LANGCHAIN", "NEXT.JS", "TAILWIND", "MONGODB"]

function Tag({ label }) {
  return (
    <span style={{
      padding: '5px 13px',
      border: '1px solid rgba(57,255,20,0.22)',
      borderRadius: 4, fontSize: 10,
      letterSpacing: '0.16em',
      color: 'rgba(200,220,200,0.68)',
      background: 'rgba(57,255,20,0.04)',
      cursor: 'default',
    }}>
      {label}
    </span>
  )
}

function Section({ title, items }) {
  return (
    <div>
      <p style={{
        fontSize: 10, color: '#39ff14',
        letterSpacing: '0.24em', marginBottom: 12,
      }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((item) => <Tag key={item} label={item} />)}
      </div>
    </div>
  )
}

export default function CardTags() {
  return (
    <>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '20px 0' }} />
      <Section title="FOCUS" items={FOCUS_ITEMS} />
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '20px 0' }} />
      <Section title="TOOLS" items={TOOLS_ITEMS} />
    </>
  )
}