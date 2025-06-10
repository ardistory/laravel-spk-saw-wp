import { router, useForm } from '@inertiajs/react';
import { createContext, useState } from 'react';
import { toast } from 'sonner';

export const SawWpContext = createContext();

export default function SawWpProvider({ children }) {
    const [calculation, setCalculation] = useState({ SAW: null, WP: null });
    const [nameHasilHitung, setNameHasilHitung] = useState('');

    const { data, setData, post } = useForm({
        criterias: [],
        subCriterias: [],
        alternatifs: [],
        scores: [],
        normalized: [],
        weighted: [],
    });

    // KRITERIA
    const addCriteria = (criteria) => setData('criterias', [...data.criterias, criteria]);

    const updateCriteria = (id, field, value) => {
        setData('criterias', data.criterias.map(criteria =>
            criteria.id === id ? { ...criteria, [field]: value } : criteria
        ));
    };

    const deleteCriteria = (criteriaId) => setData('criterias', data.criterias.filter(item => item.id != criteriaId));

    const setCriteriaToProvider = (criteria) => {
        setData('criterias', JSON.parse(criteria.criterias));

        toast('Success', { description: `menggunakan kriteria ${criteria.nama_kriteria}` });
    };

    const saveCriteriasToDb = (e) => {
        e.preventDefault();

        post(route('data-kriteria', { nameCriteriasForDb: 'criteria_default', criteriasForDb: JSON.stringify(data.criterias) }), {
            onSuccess: () => {
                toast('Sucess', { description: 'data kriteria tersimpan.' });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Failed', {
                        description: errors[key]
                    });
                });
            }
        });
    };

    // SUB KRITERIA
    const addSubCriteria = (subCriteria) => setData('subCriterias', [...data.subCriterias, subCriteria]);

    const updateSubCriteria = (id, field, value) => {
        setData('subCriterias', data.subCriterias.map(subCiteria =>
            subCiteria.id === id ? { ...subCiteria, [field]: value } : subCiteria
        ));
    };

    const deleteSubCriteria = (subCriteriaId) => setData('subCriterias', data.subCriterias.filter(item => item.id !== subCriteriaId));

    const setSubCriteriaToProvider = (subCriteria) => {
        setData('subCriterias', JSON.parse(subCriteria.sub_criterias));

        toast('Success', { description: `menggunakan sub kriteria ${subCriteria.nama_sub_kriteria}` });
    };

    const saveSubCriteriasToDb = (e) => {
        e.preventDefault();

        post(route('data-sub-kriteria', { nameSubCriteriasForDb: 'sub_criteria_default', subCriteriasForDb: JSON.stringify(data.subCriterias) }), {
            onSuccess: () => {
                toast('Sucess', { description: 'data sub kriteria tersimpan.' });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Failed', {
                        description: errors[key]
                    });
                });
            }
        });
    };

    // ALTERNATIF
    const addAlternatif = (alternatif) => setData('alternatifs', [...data.alternatifs, alternatif]);

    const updateAlternatif = (id, field, value) => {
        setData('alternatifs', data.alternatifs.map(alterantif =>
            alterantif.id === id ? { ...alterantif, [field]: value } : alterantif
        ));
    };

    const deleteAlternatif = (alternatifId) => setData('alternatifs', data.alternatifs.filter(item => item.id != alternatifId));

    const setAlternatifToProvider = (alternatif) => {
        setData('alternatifs', JSON.parse(alternatif.alternatifs));

        toast('Success', { description: `menggunakan data karyawan ${alternatif.nama_alternatifs}` });
    };

    const saveAlternatifsToDb = (e) => {
        e.preventDefault();

        const alternatifsForDb = [...data.alternatifs];

        post(route('data-alternatif', { nameAlternatifsForDb: 'alternatif_default', alternatifsForDb: JSON.stringify(alternatifsForDb) }), {
            onSuccess: () => {
                toast('Sucess', { description: 'data karyawan tersimpan.' });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Failed', {
                        description: errors[key]
                    });
                });
            }
        });
    };

    // Result & Count
    const addScore = (score) => setData('scores', [...data.scores, score]);

    const setHasilHitungToProvider = (hasilHitung) => {
        setData(JSON.parse(hasilHitung.data));
        setCalculation(JSON.parse(hasilHitung.calculation));

        toast('Success', { description: `membuka kembali hasil hitung ${hasilHitung.nama_hasil_hitung}` });
    };

    const setNameHasilHitungToDb = (nameHasilHitung) => {
        setNameHasilHitung(nameHasilHitung);
    };

    const saveHasilHitungToDb = (e, calculationFromFe) => {
        e.preventDefault();

        router.post(route('data-hasil-akhir', { nama_hasil_hitung: nameHasilHitung, data: JSON.stringify(data), calculation: JSON.stringify(calculationFromFe) }), null, {
            onSuccess: () => toast('Sucess', { description: 'data perhitungan tersimpan.' }),
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Failed', {
                        description: errors[key]
                    });
                });
            }
        });
    };

    const normalizeMatrix = (scores) => {
        const normalized = scores.map(score => {
            const criteria = data.criterias.find(c => c.id === score.criteria_id);
            const values = scores.filter(s => s.criteria_id === score.criteria_id).map(s => s.value);
            const max = Math.max(...values);
            const min = Math.min(...values);

            return {
                ...score,
                normalized: criteria.type == 'benefit' ? score.value / max : 1 - (score.value / max)
            };
        });

        setData('normalized', normalized);
        return normalized;
    };

    const calculateWeighted = (normalized) => {
        const weighted = normalized.map(score => {
            const criteria = data.criterias.find(c => c.id === score.criteria_id);
            return {
                ...score,
                weighted: score.normalized * criteria.weight
            };
        });

        setData('weighted', weighted);
        return weighted;
    };

    const calculateSAW = () => {
        const normalized = normalizeMatrix(data.scores);
        const weighted = calculateWeighted(normalized);
        const alternatives = {};

        weighted.forEach(score => {
            if (!alternatives[score.alternatif_id]) {
                alternatives[score.alternatif_id] = 0;
            }
            alternatives[score.alternatif_id] += score.weighted;
        });

        const result = Object.keys(alternatives).map(alternatif_id => ({
            alternatif_id: parseInt(alternatif_id),
            score: alternatives[alternatif_id]
        }));

        setCalculation(prev => ({ ...prev, SAW: result }));
    };

    const calculateWP = () => {
        const weighted = data.weighted.map(score => {
            const criteria = data.criterias.find(c => c.id === score.criteria_id);
            return {
                ...score,
                wp: Math.pow(score.normalized, criteria.weight)
            };
        });

        const alternatives = {};

        weighted.forEach(score => {
            if (!alternatives[score.alternatif_id]) {
                alternatives[score.alternatif_id] = 1;
            }
            alternatives[score.alternatif_id] *= score.wp;
        });

        const result = Object.keys(alternatives).map(alternatif_id => ({
            alternatif_id: parseInt(alternatif_id),
            score: alternatives[alternatif_id]
        }));

        const totalScore = result.reduce((acc, curr) => acc + curr.score, 0);

        const normalizedResult = result.map(score => ({
            alternatif_id: score.alternatif_id,
            score: score.score / totalScore
        }));

        setCalculation(prev => ({ ...prev, WP: normalizedResult }));
    };

    return (
        <SawWpContext.Provider value={{
            data,
            addCriteria, updateCriteria, deleteCriteria, setCriteriaToProvider, saveCriteriasToDb,
            addSubCriteria, updateSubCriteria, deleteSubCriteria, setSubCriteriaToProvider, saveSubCriteriasToDb,
            addAlternatif, updateAlternatif, deleteAlternatif, setAlternatifToProvider, saveAlternatifsToDb,
            addScore,
            calculateSAW, calculateWP, calculation,
            setNameHasilHitungToDb, setHasilHitungToProvider, saveHasilHitungToDb,
        }}>
            {children}
        </SawWpContext.Provider>
    );
}