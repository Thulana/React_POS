import authHeader from "./authHeader";



export const orderService = {
    save_order,view_order
};


function save_order(order){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ order: order })
    };
    fetch("/api/save_order", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log('save',result);
                return {

                    result:result
                };
            },
            (error) =>{
                console.log('save',error);
                return error
            }
        )
}

function view_order(oid){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ oid: oid })
    };
    fetch("/api/view_order", requestOptions)
        .then(res => res.json())
        .then(
            (error) => {
                return error
            },
            (result) =>{
                return result
            }
        )
}