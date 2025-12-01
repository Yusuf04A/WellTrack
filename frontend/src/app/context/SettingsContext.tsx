"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SettingsContextType {
    focusTime: number
    breakTime: number
    notifications: boolean
    soundEnabled: boolean
    darkMode: boolean
    updateSettings: (settings: Partial<SettingsContextType>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<SettingsContextType>({
        focusTime: 25,
        breakTime: 5,
        notifications: true,
        soundEnabled: true,
        darkMode: true,
        updateSettings: () => { },
    })

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Load from localStorage
        const saved = localStorage.getItem("welltrack-settings")
        if (saved) {
            const parsedSettings = JSON.parse(saved)
            setSettings((prev) => ({
                ...prev,
                ...parsedSettings,
                updateSettings: (newSettings) => updateSettingsHandler(newSettings),
            }))
        }
    }, [])

    const updateSettingsHandler = (newSettings: Partial<SettingsContextType>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings }
            localStorage.setItem("welltrack-settings", JSON.stringify(updated))
            return updated
        })
    }

    if (!mounted) return <>{children}</>

    return (
        <SettingsContext.Provider value={{ ...settings, updateSettings: updateSettingsHandler }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider")
    }
    return context
}
