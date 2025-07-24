import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Or your custom API method

const Home = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/clintInfo`)
            .then(res => setMessages(res.data.messages))
            // .then(res => console.log(res.data.messages))
            .catch(err => console.error('Error fetching messages:', err));
    }, []);

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4 text-center">Contact Form Submissions</h2>

            {messages.length === 0 ? (
                <p className="text-center">No messages found.</p>
            ) : (
                // <div className="table-responsive ">
                //     <table className="table table-bordered table-hover align-middle">
                //         <thead className="table-dark">
                //             <tr>
                //                 <th>#</th>
                //                 <th>Name</th>
                //                 <th>Email</th>
                //                 <th>Message</th>
                //                 <th>Date</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {messages.map((msg, index) => (
                //                 <tr key={msg.id || index}>
                //                     <td>{index + 1}</td>
                //                     <td>{msg.name}</td>
                //                     <td>{msg.email}</td>
                //                     <td>{msg.message}</td>
                //                     <td>{new Date(msg.date).toLocaleString()}</td>
                //                 </tr>
                //             ))}
                //         </tbody>
                //     </table>
                // </div>
                <>
                    {
                    messages.map((msg, index) => (
                            <div className='container mb-2' style={{borderRadius:'10px', backgroundColor:`${index%2===0 ? 'lightgrey': 'skyblue'}`}} key={msg.id || index}>
                               <div className='row'>
                                <div className='col-1'>{index +1}</div>
                                <div className='col'>
                                     <div className='row'>
                                    <div className='col'>NAME : {msg.name}</div>
                                    <div className='col'>EMAIL : {msg.email}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>MESSAGE : {msg.message}</div>
                                </div>
                                </div>
                               
                               </div>
                                
                            </div>
                    ))
                }
                </>
            )
            }
        </div >
    );
};

export default Home;
