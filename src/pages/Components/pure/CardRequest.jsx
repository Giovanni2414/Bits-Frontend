import { React, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const CardRequest = ({ item, deleteHandler, changeParamsHandler }) => {
  const [params, setParams] = useState(item.request.queryString);

  const handleEdit = (name, value) => {
    let copyParams = params.map((element) => {
      if (element.name === name) {
        element.value = value;
      }
      return element;
    });
    setParams(copyParams);
    changeParamsHandler(copyParams, item._id)
  };

  let paramsRequest = () =>
    params.map((item, index) => {
      return (
        <div className="flex flex-row mb-2" key={index}>
          <div className="mr-3">{item.name}: </div>
          <input
            type="text"
            placeholder="Type here"
            className="input w-full input-xs text-black"
            defaultValue={item.value}
            onChange={(e) => handleEdit(item.name, e.currentTarget.value)}
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
          {paramsRequest()}
        </div>
        <button
          className="bg-white rounded-full text-white absolute top-0 right-0 m-2 p-2"
          onClick={() => deleteHandler(item._id)}
        >
          <MdOutlineClose fill="#FF0000" size={25}/>
        </button>
      </div>
    </div>
  );
};

export default CardRequest;
