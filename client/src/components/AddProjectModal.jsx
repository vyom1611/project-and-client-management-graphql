import { useState } from "react";
import { FaList } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useMutation, useQuery } from "@apollo/client";

function AddClientModal(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    // Get clients for select
    const { loading, err, data } = useQuery(GET_CLIENTS)

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    const onSubmit = (event) => {
        event.preventDefault()

        if (name === '' || description === '' || status === '') {
            return alert("Please fill out all the forms")
        }
        addProject(name, description, status, clientId);

        setName("");
        setDescription("");
        setStatus("new");
        setClientId("")
    };

    if (loading) return null;
    if (err) return "Some errors";

    return (
        <>
            { !loading && !err && (
                <>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                    <div className="d-flex align-items-center">
                        <FaList className="icon" />
                        <div>New Project</div>
                    </div>
                </button>

                <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit} >
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="new">Not Started</option>
                                            <option value="progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Client</label>
                                        <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                            <option value="">Select Client</option>
                                            {data.clients.map((client) => (
                                                <option value={client.id} key={client.id}>
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="btn btn-primary" data-bs-dismiss="modal" type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )}

        </>
    );
}

export default AddClientModal;