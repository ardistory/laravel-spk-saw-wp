import { useForm } from '@inertiajs/react';
import { createContext, useState } from 'react';

export const SawWpContext = createContext();

export default function SawWpProvider({ children }) {
    const [calculation, setCalculation] = useState({ SAW: null, WP: null });

    const { data, setData } = useForm({
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

    const normalizeMatrix = (scores) => {
        const normalized = scores.map(score => {
            const criteria = data.criterias.find(c => c.id === score.criteria_id);
            const values = scores.filter(s => s.criteria_id === score.criteria_id).map(s => s.value);
            const max = Math.max(...values);
            const min = Math.min(...values);

            return {
                ...score,
                normalized: criteria.type === 'benefit' ? score.value / max : 1 - (score.value / max)
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
        }}>
            {children}
        </SawWpContext.Provider>
    );
}