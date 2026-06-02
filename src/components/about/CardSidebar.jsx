export default function CardSidebar() {
  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%,100% { opacity:1; box-shadow: 0 0 10px #39ff14; }
          50%      { opacity:0.35; box-shadow: 0 0 4px #39ff14; }
        }
      `}</style>

      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        width: 72, flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.07)',
        padding: '36px 0',
      }}>
        <span style={{
          fontSize: 15, color: '#39ff14',
          fontWeight: 600, paddingLeft: 20,
        }}>
          01
        </span>

        <div style={{
          flex: 1, width: 1, margin: '16px auto',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.13), rgba(255,255,255,0.02))',
        }} />

        <div style={{
          width: 9, height: 9, borderRadius: '50%',
          background: '#39ff14', boxShadow: '0 0 8px #39ff14',
          marginLeft: 20, animation: 'dotPulse 2s ease-in-out infinite',
        }} />
      </div>
    </>
  )
}