import React, { useEffect, useState } from 'react';
import { fetchPods } from '../../services/api';

interface Pod {
    metadata: {
        name: string;
        namespace: string;
    };
    status: {
        phase: string;
    };
}

export const PodList: React.FC = () => {
    const [pods, setPods] = useState<Pod[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPods = async () => {
            try {
                const data = await fetchPods();
                setPods(data);
            } catch (error) {
                console.error('Error loading pods:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPods().then();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Pod List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Namespace</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {pods.map(pod => (
                    <tr key={pod.metadata.name}>
                        <td>{pod.metadata.name}</td>
                        <td>{pod.metadata.namespace}</td>
                        <td>{pod.status.phase}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};