import StraEthForm from "./form-component/StraEthForm";
import StraEthChart from "./linechart-component/StraEthChart";

export default function FormAndChart () {
    return <div className="App">
            <StraEthForm />
            <div>
              <StraEthChart />
            </div>
          </div>
}