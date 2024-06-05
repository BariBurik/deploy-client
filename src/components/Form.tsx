import React, { ChangeEvent, FC, useState } from "react";

interface FormProps {
    linkToSheet: URL | null,
    linkToTemplate: URL | null,
    setLinkToSheet: (sheetLink: URL | null) => void,
    setLinkToTemplate: (templateLink: URL | null) => void,
    openModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    sheetUrlToFile: () => void,
    templateUrlToFile: () => void,
    download: () => void
}

const Form: FC<FormProps> = ({linkToSheet, linkToTemplate, setLinkToSheet, setLinkToTemplate, openModal, sheetUrlToFile, templateUrlToFile, download}) =>  {

    const [isSheetError, setIsSheetError] = useState<boolean>(false)
    const [isTemplateError, setIsTemplateError] = useState<boolean>(false)

    const handleLinkChange = (event: ChangeEvent<HTMLInputElement>, setLink: (anyLink: URL | null) => void) => {
        const anyLink = event.target.value;
        try {
            const url = new URL(anyLink);
            setLink(url)
            if (setLink === setLinkToSheet) {
                setIsSheetError(false)
            } else {
                setIsTemplateError(false)
            }
        } catch (e) {
            if (setLink === setLinkToSheet) {
                setIsSheetError(true)
            } else {
                setIsTemplateError(true)
            }
        }  
    }

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        download()
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!isSheetError && !isTemplateError && ((linkToSheet && linkToTemplate) !== null)) {
            sheetUrlToFile()
            templateUrlToFile()
        } else {
            alert('Введите корректные ссылки на файлы')
        }
    }

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!isSheetError && !isTemplateError && ((linkToSheet && linkToTemplate) !== null)) {
            openModal(e)
        } else {
            alert('Введите корректные ссылки на файлы')
        }
    }

    return ( 
        <form className="d-flex flex-column mx-auto mt-5 p-3 w-75 border">
            <div className="form-floating mb-3">
                <input onChange={(e) => handleLinkChange(e, setLinkToSheet)} type="link" className="form-control" id="v" placeholder="Таблица" aria-labelledby="passwordHelpBlock"/>
                <label htmlFor="sheetLink">Таблица</label>
                {isSheetError ? <div id="urlHelpBlock" className="text-danger form-text">
                    Вы должны ввести ссылку, по типу: https://xxx.xx, а также, она должна вести к файлу
                </div> : null}
            </div>
            <div className="form-floating mb-3">
                <input onChange={(e) => handleLinkChange(e, setLinkToTemplate)} type="link" className="form-control" id="templateLink" placeholder="Шаблон"/>
                <label htmlFor="templateLink">Шаблон</label>
                {isTemplateError ? <div id="urlHelpBlock" className="text-danger form-text">
                    Вы должны ввести ссылку, по типу: https://xxx.xx, а также, она должна вести к файлу
                </div> : null}
            </div>
            <div className="d-flex justify-content-end mb-5 ai-end">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Подтвердить</button>
            </div>
            <div className="d-flex justify-content-end mb-3 ai-end">
                <button type="submit" onClick={handleOpenModal} className="btn btn-primary me-3">Предварительный просмотр</button>
                <button type="submit" onClick={handleDownload} className="btn btn-primary">Получить файл</button>
            </div>
        </form>
    );
}

export default Form;