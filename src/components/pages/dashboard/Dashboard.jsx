
import { Button } from "@/components/ui/button"
import "./style.css"
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkService } from '../../../service/link.service.js'
import CommonTable from "../common/Table";
import { setLinks } from "@/reducers/app.reducer";
import { getLocalStorage } from "@/storage/LocalStorage";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');




const Dashboard = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch()
    const links = useSelector((state) => state.links.links)
    const [url, setUrl] = useState("");
    const [error, setError] = useState("")

    const id = getLocalStorage("user")


    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        setError("");
    };



    const handleSubmit = async () => {
        try {

            if (url.trim() == '') {

                setError("url can not be empty");
                return;
            }
            const res = await LinkService.create(JSON.stringify({ url, user: id.user }))
            if (!res.success) {
                alert(res.message)

            }
            else {

                setIsOpen(false)
                navigate("/")
            }
        }
        catch (error) {
            console.log(error);
        }

    };



    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    useEffect(() => {
        const fetchUrl = async () => {
            const urls = await LinkService.get(JSON.stringify({ isActive: true }))
            if (urls.success) {
                dispatch(setLinks(urls.data))
            }
            else {
                alert(urls.message)
            }

        }
        fetchUrl()
    }, [])

    return (
        <div className="dashboard_main">
            <div className="create_link">
                <Button
                    variant="outline"
                    className="button"
                    onClick={openModal}
                    style={{ width: "200px" }}
                >Add Link</Button>
            </div>
            <Modal
                isOpen={modalIsOpen}

                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Link"
            >
                <div className="inputContainer">
                    <Input
                        value={url}
                        name="url"
                        type="text"
                        placeholder="Enter Url"
                        onChange={handleInputChange}
                        className={"inputBox"} />
                    <label className="errorLabel">{error}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <Button
                        variant="outline"
                        className="button"
                        onClick={handleSubmit}>Create</Button>
                </div>


            </Modal>
            <div className="tableContainer">
                <CommonTable data={links} />
            </div>




        </div>
    )
}

export default Dashboard