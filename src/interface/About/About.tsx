import viteLogo from '../../assets/vite.svg'
import tsLogo from '../../assets/ts-logo-256.svg'
import nodeLogo from '../../assets/node.svg'
import electronLogo from '../../assets/electron.svg'
import reactLogo from '../../assets/react.svg'
import reduxLogo from '../../assets/redux.svg'
import tailwindLogo from '../../assets/tailwind.svg'
import React from 'react';
import ExternalUrl from "@/interface/About/ExternalUrl";
import {BsGithub} from "react-icons/bs";
import UsedInstrumentPanel from "@/interface/About/UsedInstrumentPanel";

function About() {
    const usedTechnologies = React.useMemo(
        () => [
            {
                icon: <img src={tsLogo} alt=""/>,
                title: "Язык программирования",
                instrumentTitle: "Typescript"
            },
            {
                icon: <img src={viteLogo} alt=""/>,
                title: "Сборщик проекта",
                instrumentTitle: "Vite"
            },
            {
                icon: <img src={nodeLogo} alt=""/>,
                title: "Программная платформа",
                instrumentTitle: "NodeJS"
            },
            {
                icon: <img src={electronLogo} alt=""/>,
                title: "Фреймворк для написания десктопного приложения",
                instrumentTitle: "Electron"
            },
            {
                icon: <img src={reactLogo} alt=""/>,
                title: "Интерфейс написан с помощью",
                instrumentTitle: "React"
            },
            {
                icon: <img src={reduxLogo} alt=""/>,
                title: "Вспомогательные библиотеки",
                instrumentTitle: "Redux, ReactIcons, JSXGraph"
            },
            {
                icon: <img src={tailwindLogo} alt=""/>,
                title: "Стилизация приложения",
                instrumentTitle: "TailwindCSS"
            }
        ],
        []
    )

    return (
        <div className="centered h-full w-full text-xl text-center flex-col">
            <h1>Simplex Application</h1>
            <div className="flex gap-2 mb-4">
                <p>Программа написана пользователем </p>
                <ExternalUrl
                    url="https://github.com/icestormikk"
                    title="icestormikk"
                    icon={(<BsGithub/>)}
                />
            </div>
            <div>
                <p>Исходный код приложения размещён в </p>
                <ExternalUrl
                    url="https://github.com/icestormikk/simplex-method-lab.git"
                    title="репозитории"
                    icon={(<BsGithub/>)}
                />
            </div>
            <table className="used-tech-table">
                <thead>
                    <tr>
                        <td>Стек использованных инструментов</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        usedTechnologies.map((tech, index) => (
                            <UsedInstrumentPanel
                                key={index}
                                icon={tech.icon}
                                title={tech.title}
                                instrumentTitle={tech.instrumentTitle}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default About;