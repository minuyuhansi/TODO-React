import React from 'react'
import useTheme from '../contexts/theme'

function ThemeBtn() {
    const { themeMode, darkTheme, lightTheme } = useTheme()

    const onChangeBtn = (e) => {
        const darkMode = e.currentTarget.checked
        if (darkMode) {
            darkTheme()
        } else {
            lightTheme()
        }
    }


    return (
        <div className='flex w-20 p-2 border border-gray-300 dark:border-zinc-700 rounded-3xl'>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox"
                    value=""
                    className='sr-only peer'
                    onChange={onChangeBtn}
                    checked={themeMode === 'dark'}
                />
                <div className="w-11 h-6 bg-white peer-focus:outline-none 
            rounded-full peer bg-linear-to-r dark:from-[#f87171]  dark:to-[#fca5a5]
             peer-checked:after:translate-x-full border
          border-[#f87171] dark:border-none after:content-[''] after:absolute after:top-0.5
            after:left-0.5 after:bg-linear-to-r after:from-[#f87171] after:to-[#fca5a5] 
            dark:after:bg-white dark:after:from-white dark:after:to-white after:rounded-full 
            after:h-5 after:w-5 after:transition-all after:duration-300 after:ease-in-out">
                </div>
                <span className="ml-1 text-sm font-medium text-gray-900 dark:text-slate-100">
                    {themeMode === 'dark' ? "🌞" : "🌛"}
                </span>
            </label>
        </div>


    )
}

export default ThemeBtn