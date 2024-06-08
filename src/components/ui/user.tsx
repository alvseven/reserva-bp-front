import { AvatarIcon } from '@radix-ui/react-icons'

export function User() {
    return <div className='flex items-center gap-4'>
        <AvatarIcon className='text-slate-300 size-10' />
        <span className='text-lg text-slate-100'>
            Samuel Santos
        </span>
    </div>
}