import Image from 'next/image'

export default function PresetToken({}) {
  return (
    <div
      onClick={() => console.log('Clicked!')}
      style={{
        borderRadius: '50%',
        border: '4px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Image src="/KKUB.png" alt="Share" width={22} height={22} className="rounded-full" />
    </div>
  )
}
