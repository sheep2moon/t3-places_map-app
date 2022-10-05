import React, { useRef, useState } from "react";
import Button from "../../modules/common/Button";
import InputText from "../../modules/common/InputText";

const Signup = () => {
    const [values, setValues] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value);

        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="mt-4 flex flex-col items-center justify-center text-light">
            <h1 className="pb-4 text-xl">Zaloguj do restauracji</h1>
            <form action="" className="flex flex-col gap-3">
                <InputText label="e-mail" name="email" value={values.email} handleChange={handleChange} />
                <InputText label="hasło" name="password" value={values.password} handleChange={handleChange} />
                <span></span>
                <Button variant="alternative">Zaloguj</Button>
            </form>
        </div>
    );
};

export default Signup;
