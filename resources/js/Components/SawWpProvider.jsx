import { router, useForm } from '@inertiajs/react';
import { createContext, useState } from 'react';
import { toast } from 'sonner';

export const SawWpContext = createContext();

export default function SawWpProvider({ children }) {
    const [calculation, setCalculation] = useState({ SAW: null, WP: null });
    const [nameCriteria, setNameCriteria] = useState('');
    const [nameSubCriteria, setNameSubCriteria] = useState('');
    const [nameAlternatif, setNameAlternatif] = useState('');
    const [nameHasilHitung, setNameHasilHitung] = useState('');

    const { data, setData, post } = useForm({
        criterias: [],
        subCriterias: [],
        alternatifs: [],
        scores: [],
        normalized: [],
        weighted: [],
    });

    const addCriteria = (criteria) => setData('criterias', [...data.criterias, criteria]);
    const addAlternatif = (alternatif) => setData('alternatifs', [...data.alternatifs, alternatif]);
    const addScore = (score) => setData('scores', [...data.scores, score]);

    const addSubCriteria = (subCriteria) => setData('subCriterias', [...data.subCriterias, subCriteria]);
    const deleteSubCriteria = (subCriteriaId) => setData('subCriterias', data.subCriterias.filter(item => item.id !== subCriteriaId));

    const deleteCriteria = (criteriaId) => setData('criterias', data.criterias.filter(item => item.id != criteriaId));
    const deleteAlternatif = (alternatifId) => setData('alternatifs', data.alternatifs.filter(item => item.id != alternatifId));

    const setCriteriaToProvider = (criteria) => {
        setData('criterias', JSON.parse(criteria.criterias));

        toast('Success', { description: `menggunakan kriteria ${criteria.nama_kriteria}` });
    };

    const setSubCriteriaToProvider = (subCriteria) => {
        setData('subCriterias', JSON.parse(subCriteria.sub_criterias));

        toast('Success', { description: `menggunakan sub kriteria ${subCriteria.nama_sub_kriteria}` });
    };

    const setAlternatifToProvider = (alternatif) => {
        setData('alternatifs', JSON.parse(alternatif.alternatifs));

        toast('Success', { description: `menggunakan data karyawan ${alternatif.nama_alternatifs}` });
    };

    const setHasilHitungToProvider = (hasilHitung) => {
        setData(JSON.parse(hasilHitung.data));
        setCalculation(JSON.parse(hasilHitung.calculation));

        toast('Success', { description: `membuka kembali hasil hitung ${hasilHitung.nama_hasil_hitung}` });
    };

    const setNameCriteriaToDb = (nameCriteria) => {
        setNameCriteria(nameCriteria);
    };

    const setNameSubCriteriaToDb = (nameSubCriteria) => {
        setNameSubCriteria(nameSubCriteria);
    };
    const setNameAlternatifToDb = (nameAlternatif) => {
        setNameAlternatif(nameAlternatif);
    };

    const setNameHasilHitungToDb = (nameHasilHitung) => {
        setNameHasilHitung(nameHasilHitung);
    };

    const saveCriteriasToDb = (e) => {
        e.preventDefault();

        const criteriasForDb = [...data.criterias];

        post(route('data-kriteria', { nameCriteriasForDb: nameCriteria, criteriasForDb: JSON.stringify(criteriasForDb) }), {
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

    const saveSubCriteriasToDb = (e) => {
        e.preventDefault();

        const subCriteriasForDb = [...data.subCriterias];

        post(route('data-sub-kriteria', { nameSubCriteriasForDb: nameSubCriteria, subCriteriasForDb: JSON.stringify(subCriteriasForDb) }), {
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

    const saveAlternatifsToDb = (e) => {
        e.preventDefault();

        const alternatifsForDb = [...data.alternatifs];

        post(route('data-alternatif', { nameAlternatifsForDb: nameAlternatif, alternatifsForDb: JSON.stringify(alternatifsForDb) }), {
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

    const saveHasilHitungToDb = (e, calculationFromFe) => {
        e.preventDefault();

        router.post(route('data-perhitungan', { nama_hasil_hitung: nameHasilHitung, data: JSON.stringify(data), calculation: JSON.stringify(calculationFromFe) }), null, {
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
            addCriteria,
            deleteCriteria,
            addAlternatif,
            deleteAlternatif,
            addSubCriteria,
            deleteSubCriteria,
            addScore,
            calculateSAW,
            calculateWP,
            calculation,
            setNameCriteriaToDb,
            saveCriteriasToDb,
            setCriteriaToProvider,
            saveHasilHitungToDb,
            setNameHasilHitungToDb,
            setHasilHitungToProvider,
            saveSubCriteriasToDb,
            setNameSubCriteriaToDb,
            setSubCriteriaToProvider,
            setNameAlternatifToDb,
            saveAlternatifsToDb,
            setAlternatifToProvider,
        }}>
            {children}
        </SawWpContext.Provider>
    );
}