import BpLogo from '@/assets/bg-logo.svg'

export function Header() {
    return <header className="flex justify-between items-center p-8 border-b border-b-slate-800 w-full h-16">
        <img className='opacity-95 size-40' src={BpLogo} alt="Logo da Bem Protege seguros" />
        <p className="font-bold font-mono text-blue-600 text-lg uppercase">Reserva BP</p>
    </header>
}