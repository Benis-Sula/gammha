import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  label: string
  name: string
  type?: 'text' | 'email' | 'url' | 'number' | 'textarea' | 'select'
  rows?: number
  options?: { value: string; label: string }[]
  required?: boolean
  error?: string
  register?: UseFormRegisterReturn
  placeholder?: string
  className?: string
}

const inputBase =
  'w-full rounded-lg border border-border bg-surface px-3 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm'

export default function AdminFormField({
  label, name, type = 'text', rows = 3, options = [], required,
  error, register, placeholder, className = '',
}: Props) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-text mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          className={`${inputBase} py-2.5 resize-y`}
          {...register}
        />
      ) : type === 'select' ? (
        <select id={name} className={`${inputBase} h-10`} {...register}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`${inputBase} h-10`}
          {...register}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
