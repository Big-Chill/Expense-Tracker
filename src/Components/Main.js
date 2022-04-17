import React,{useState,useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Main() {

    const[budget,setBudget] = useState(0);
    const[tempbudget,setTempbudget] = useState("");
    const[remaining,setRemaining] = useState(0);
    const[spent,setSpent] = useState(0);
    const[expenses,setExpenses] = useState([]);
    const[filtereddata,setFilteredData]=useState([]);
    const[searchinput,setSearchInput]=useState("");
    const[task,setTask] = useState("");
    const[cost,setCost] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    function handleEdit(e)
    {
        setBudget(tempbudget);
        setRemaining(tempbudget);
        handleClose();
    }

    function handleSave()
    {
        if(remaining-cost<0)
        {
            alert("You have exceeded your budget");
            setTask("");
            setCost("");
            return;
        }
        let oldtasks=[...expenses];
        oldtasks.push({task:task,cost:cost});
        setExpenses(oldtasks);
        setSpent(spent+parseInt(cost));
        setRemaining(prev=>prev-parseInt(cost));
        setTask("");
        setCost("");
    }

    function handleDelete(item)
    {
        let oldtasks=[...expenses];
        oldtasks.splice(oldtasks.indexOf(item),1);
        setExpenses(oldtasks);
        setSpent(prev=>prev-parseInt(item.cost));
        setRemaining(prev=>prev+parseInt(item.cost));
    }

    function handleSearch(searchval)
    {
        const text=searchval.toLowerCase();
        setSearchInput(text);
        console.log(expenses);
        const newData=expenses.filter(item=>(item.task.toLowerCase().includes(text)));
        if(text!="")
        {
            setFilteredData(newData);
        }
        else
        {
            setFilteredData(expenses);
        }
    }

    function handleKeyDown(e)
    {
        if(e.key=="Enter")
        {
            handleSave();
        }
    }

    

  return (
    <div>
        <div className="opt-card">
                <div className="card ecards1" style={{width: '25rem',height:"4rem"}}>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <h3 style={{fontSize:"20px",marginRight:"180px",marginTop:"1%"}}>Budget : ₹{budget}</h3>
                    <button className="btn btn-primary" type="button" onClick={handleOpen}>Edit</button>
                </div>
                </div>

                <div className="card ecards2" style={{width: '25rem',height:"4rem"}}>
                    <div className="card-body">
                    <h3 style={{fontSize:"20px"}}>Remaining : ₹{remaining}</h3>
                    </div>
                </div>

                <div className="card ecards3" style={{width: '25rem',height:"4rem"}}>
                    <div className="card-body">
                    <h3 style={{fontSize:"20px"}}>Spent so far : ₹{spent}</h3>
                    </div>
                </div>
        </div>

        <div className="opt-card2">
            <h2>My Expenses</h2>
        </div>

        <div className="opt-card2">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type to Search..." aria-label="Username" aria-describedby="basic-addon1" style={{marginTop:"-60px", fontSize:"25px"}} onChange={(e)=>handleSearch(e.target.value)}/>
            </div>
        </div>

        <div className="opt-card3">

                <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Index</th>
                                    <th scope="col">Task</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchinput.length==0?
                                        expenses.map((expense,index)=>(
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{expense.task}</td>
                                                    <td>{expense.cost}</td>
                                                    <td><button className="btn btn-danger" type="button" style={{width:"80px", height:"40px"}} onClick={()=>handleDelete(expense)}>Delete</button></td>
                                                    </tr>
                                            )
                                        )
                                        :
                                        filtereddata.map((expense,index)=>(
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{expense.task}</td>
                                                <td>{expense.cost}</td>
                                                <td><button className="btn btn-danger" type="button" style={{width:"80px", height:"40px"}} onClick={()=>handleDelete(expense)}>Delete</button></td>
                                                </tr>
                                        )
                                    )
                                    }
                                    
                                </tbody>
                </table>

        </div>

        <div className="opt-card2">
            <h2>Add Expense</h2>
        </div>

        <div className="final-tsk">
            <input className="form-control" type="text" placeholder="Task" style={{width:"20vw"}} value={task} onChange={(e)=>setTask(e.target.value)}/>
            <input className="form-control" type="text" placeholder="Cost" style={{marginLeft:"20px", width:"20vw"}} value={cost} onChange={(e)=>setCost(e.target.value)}/>
            <button className="btn btn-primary" type="button" style={{marginLeft:"20px"}} onClick={handleSave} onKeyDown={(e)=>handleKeyDown(e)}>Save</button>
        </div>

        {
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <div style={{display:"flex"}}>
                    <input className="form-control" type="text" placeholder="Budget..." style={{width:"20vw"}} value={tempbudget} onChange={(e)=>setTempbudget(e.target.value)}/>
                    <button className="btn btn-primary" type="button" style={{marginLeft:"40px", marginTop:"0.7px"}} onClick={handleEdit}>Save</button>
                </div>
            </Box>
          </Modal>
        }
    </div>
  )
}
