import { useReducer, useState } from "react";

interface IForm {
    name: string;
    password: string;
}

interface ActionType {
    type: string;
    payload: string;
}

export default function Testing() {
  //     const[form,setForm]=useState({
  //         name:"Ephraim",
  //         password:"Ee1f2i3"
  // })

  const [form, dispacth] = useReducer(reducer, {
    name: "Ephraim",
    password: "Ee1f2i3",
  });

  function reducer(state: IForm, action: ActionType): IForm {
    switch (action.type) {
      case "name-change":
        return { ...state, name: action.payload };
      case "password-change":
        return { ...state, password: action.payload };
      case "show-details":
        alert(JSON.stringify(action.payload))
        return{...state}
        default:
            return {...state}
    }
  }
  return (
    <div
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        dispacth({type:"show-details",payload:form as unknown as string})
      }}
    >
      <form action="" className="flex gap-5 bg-gray-200 py-4 px-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => {
            dispacth({ type: "name-change", payload: e.target.value });
          }}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => {
            dispacth({
              type: "password-change",
              payload: e.target.value,
            });
          }}
        />
        <button type="submit" className="bg-blue-200 p-2">
          submit
        </button>
      </form>
    </div>
  );
}
