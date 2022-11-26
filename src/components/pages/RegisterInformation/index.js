import { useState, useCallback, memo } from 'react'
import RegisterPassword from '../RegisterPassword'
import RegisterProfile from '../RegisterProfile'

function RegisterInformation({ languageSelected, role, setProgress }) {
    const [nextScreen, setNextScreen] = useState(false)
    const [passwordMain, setPasswordMain] = useState('')

    const handleNextScreen = useCallback(() => {
        setNextScreen(true)
    })

    return (<>
        {nextScreen ? <RegisterProfile setProgress={setProgress} role={role} languageSelected={languageSelected} passwordMain={passwordMain}/> :
            <RegisterPassword languageSelected={languageSelected} handleNextScreen={handleNextScreen} role={role} setPasswordMain={setPasswordMain}/>}
    </>)
}

export default memo(RegisterInformation)