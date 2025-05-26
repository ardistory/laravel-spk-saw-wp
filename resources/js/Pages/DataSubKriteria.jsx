import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Boxes } from "lucide-react";
import { useContext } from "react";

const DataSubKriteria = ({ auth }) => {
    const { addSubCriteria, data } = useContext(SawWpContext);

    const handleAddSubCriteria = (event) => {
        event.preventDefault();
        const subCriteria = {
            id: Date.now(),
            criteria_id: parseInt(event.target.criteria_id.value),
            name: event.target.name.value,
            weight: parseFloat(event.target.weight.value)
        };
        addSubCriteria(subCriteria);
        event.target.reset();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Sub Kriteria" />

            <div className={''}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Boxes size={30} />
                    Data Sub Kriteria
                </h1>
            </div>
            <div>
                <h1>Data Sub Kriteria</h1>
                <form onSubmit={handleAddSubCriteria}>
                    <label>Kriteria:</label>
                    <select name="criteria_id" required>
                        {data.criteria.map((criteria) => (
                            <option key={criteria.id} value={criteria.id}>{criteria.name}</option>
                        ))}
                    </select>
                    <br />
                    <label>Nama Sub Kriteria:</label>
                    <input type="text" name="name" required />
                    <br />
                    <label>Bobot:</label>
                    <input type="number" step="0.01" name="weight" required />
                    <br />
                    <button type="submit">Tambah Sub Kriteria</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Kriteria</th>
                            <th>Nama Sub Kriteria</th>
                            <th>Bobot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.subCriteria && data.subCriteria.map((subCriteria) => (
                            <tr key={subCriteria.id}>
                                <td>{data.criteria.find((criteria) => criteria.id === subCriteria.criteria_id).name}</td>
                                <td>{subCriteria.name}</td>
                                <td>{subCriteria.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataSubKriteria;