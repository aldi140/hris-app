import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"

const InputForm = ({label, name, type, placeholder, onChange, onFocus, autoComplete}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} placeholder={placeholder} className="placeholder:text-gray-400" onChange={onChange} onFocus={onFocus} autoComplete={autoComplete} required/>
        </div>
    )
}

export default InputForm