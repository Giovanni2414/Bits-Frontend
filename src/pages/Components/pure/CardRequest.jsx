import { React /*, useState*/ } from 'react';

const CardRequest = (props) => {
    
    const item = props.item
    //const [params, setParams] = useState([]);


    let paramsRequest = (queryString) =>
    queryString.map((item) => {
      return (
        <div className="flex flex-row mb-2">
          <div className="mr-3">{item.name}: </div>
          <input
            type="text"
            placeholder="Type here"
            className="input w-full input-xs text-black"
          />
        </div>
      );
    });

    let domain = item.request.url;
    const regex = /^(?:https?:\/\/)?([^/?#]+)/i;
    domain = domain.match(regex)[1].replace("www.", "");

    return (
        <div className="card bg-gradient-to-b from-varxen-primaryPurple to-varxen-secundaryPurple text-white">
          <div className="card-body">
            <h2 className="card-title">{domain}</h2>
            <p>
              <b>Method: </b>
              {item.request.method}
            </p>
            <div className="divider before:bg-white after:bg-white  "></div>
            <div className="h-32 overflow-y-auto">
              <div className="mb-2">PARAMS</div>
              {paramsRequest(item.request.queryString)}
            </div>
            <div className="card-actions">
              <button className="btn bg-[#E3C77B] text-black hover:bg-varxen-complementaryPrimaryPurple">Delete Request</button>
              <button className="btn bg-varxen-complementaryPrimaryPurple">Save Values</button>
            </div>
          </div>
        </div>
    );
}

export default CardRequest;
