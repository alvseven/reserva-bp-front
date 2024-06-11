import { AvatarIcon } from '@radix-ui/react-icons'

interface UserProps {
    name: string
}

export function User({ name }: UserProps) {
    return <div className='flex items-center gap-4 lg:gap-2 xl:gap-0' >
        <AvatarIcon className='w-16 h-8 text-slate-300' />
        <span className='text-slate-100 text-xs md:text-base'>
            {name}
        </span>
    </ div>
}