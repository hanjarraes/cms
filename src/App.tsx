import Content from 'layout/content.component'
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from 'layout/header.component'

function App(): React.ReactElement {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        AOS.init({
            delay: 300,
            once: true,
        })
    }, [])

    useEffect(() => {
        const contentElement = contentRef.current
        if (contentElement) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        let playTimeout
                        let video = entry.target as HTMLVideoElement
                        if (entry.isIntersecting) {
                            if (video.paused)
                                playTimeout = setTimeout(() => {
                                    video.currentTime = 0
                                    video.play()
                                }, 500)
                        } else {
                            if (playTimeout) {
                                clearTimeout(playTimeout)
                                playTimeout = null
                            }
                            video.pause()
                            video.currentTime = 0
                        }
                    })
                },
                {
                    root: contentElement,
                    threshold: 0.85,
                },
            )

            document.querySelectorAll('video').forEach((video) => {
                observer.observe(video)
            })

            return () => {
                observer.disconnect()
            }
        }
    }, [])

    return (
        <>
            <div ref={contentRef}>
                <Header />
                <Content>
                    <Outlet />
                </Content>
            </div>
        </>
    )
}

export default App
