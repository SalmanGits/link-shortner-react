/* eslint-disable react/prop-types */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LinkService } from '@/service/link.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Modal from 'react-modal';



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




export default function BasicTable({ data }) {

    const [editModal, setIsModal] = useState(false);
    const [link, setLink] = useState("");
    const [linkId, setLinkId] = useState("")
    const navigate = useNavigate();
    const handleEditInputChange = (e) => {
        setLink(e.target.value);

    };



    const handleEditSubmit = async () => {
        try {
            const res = await LinkService.edit(JSON.stringify({ url: link, linkId }))
            if (!res.success) {
                alert(res.message)

            }
            else {

                setIsModal(false)
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = (id, link) => {
        setLinkId(id)
        setLink(link)
        setIsModal(true)

    }

    const handleDelete = async (id) => {
        try {
            const res = await LinkService.deleteLink(id)
            if (!res.success) {
                //handle error
                alert(res.message)

            }
            else {

                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    function editCloseModal() {
        setIsModal(false);


    }
    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Url</TableCell>
                            <TableCell align="right">Short Url</TableCell>
                            <TableCell align="right">Clicks</TableCell>
                            <TableCell align="right">Active</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{row.urlId}</TableCell>
                                <TableCell align='right'>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.url}</TableCell>
                                <TableCell align="right">{row.shortUrl}</TableCell>
                                <TableCell align="right">{row.clicks}</TableCell>
                                <TableCell align="right">{row.isActive ? "true" : "false"}</TableCell>
                                <TableCell align="right">{row.createdAt.split("T")[0]}</TableCell>
                                <TableCell align="right"><FaEdit onClick={() => handleEdit(row._id, row.url)} style={{ fontSize: "25px", marginRight: "10px", cursor: "pointer" }} /> <MdDelete style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => handleDelete(row._id)} />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                isOpen={editModal}
                onRequestClose={editCloseModal}
                style={customStyles}
                contentLabel="Edit Link"
            >
                <div className="inputContainer">
                    <Input
                        value={link}
                        name="url"
                        type="text"

                        onChange={handleEditInputChange}
                        className={"inputBox"} />
                </div>
                <br />
                <div className="inputContainer">
                    <Button
                        variant="outline"
                        className="button"
                        onClick={handleEditSubmit}>Edit</Button>
                </div>


            </Modal>
        </>
    );
}