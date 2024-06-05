import { FC } from "react";

interface ModalProps {
    finallyHtml: null | string
    closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}


const Modal: FC<ModalProps> = ({ closeModal, finallyHtml}) => {
    console.log(finallyHtml)

    return (
        <div className="modal fade d-block show">
            <div className="modal-dialog pt-7">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Предварительный просмотр файла</h5>
                        <button type="button" className="close" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                    {finallyHtml && <div dangerouslySetInnerHTML={{ __html: finallyHtml }}></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal