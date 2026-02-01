/**
 * Mock Data Service for AI-First CRM - HCP Module
 * Mirrors the structure of the provided MySQL schema.
 */

export const products = [
    {
        id: 1,
        name: 'CardioMax 50mg',
        category: 'Cardiovascular',
        description: 'Beta-blocker for hypertension management',
        is_active: true
    },
    {
        id: 2,
        name: 'OncoGuard 100mg',
        category: 'Oncology',
        description: 'Chemotherapy agent for lung cancer',
        is_active: true
    },
    {
        id: 3,
        name: 'NeuroShield 25mg',
        category: 'Neurology',
        description: 'Anti-epileptic medication',
        is_active: true
    },
    {
        id: 4,
        name: 'PediaVita Syrup',
        category: 'Pediatrics',
        description: 'Multivitamin supplement for children',
        is_active: true
    }
];

export const topics = [
    { id: 1, name: 'Drug Efficacy', category: 'Clinical' },
    { id: 2, name: 'Side Effects', category: 'Safety' },
    { id: 3, name: 'Dosage Guidelines', category: 'Clinical' },
    { id: 4, name: 'Clinical Trials', category: 'Research' },
    { id: 5, name: 'Patient Compliance', category: 'Treatment' },
    { id: 6, name: 'Pricing & Reimbursement', category: 'Commercial' },
    { id: 7, name: 'Competitive Products', category: 'Market' },
    { id: 8, name: 'New Product Launch', category: 'Marketing' }
];

export const hcps = [
    {
        id: 1,
        name: 'Dr. Rajesh Kumar',
        specialty: 'Cardiology',
        email: 'rajesh.kumar@hospital.com',
        phone: '+91-9876543210',
        hospital_affiliation: 'Apollo Hospital',
        city: 'Mumbai',
        state: 'Maharashtra',
        status: 'active',
        initials: 'RK',
        avatarColor: 'bg-blue-100 text-blue-600'
    },
    {
        id: 2,
        name: 'Dr. Priya Sharma',
        specialty: 'Oncology',
        email: 'priya.sharma@hospital.com',
        phone: '+91-9876543211',
        hospital_affiliation: 'Tata Memorial',
        city: 'Mumbai',
        state: 'Maharashtra',
        status: 'active',
        initials: 'PS',
        avatarColor: 'bg-purple-100 text-purple-600'
    },
    {
        id: 3,
        name: 'Dr. Amit Patel',
        specialty: 'Neurology',
        email: 'amit.patel@hospital.com',
        phone: '+91-9876543212',
        hospital_affiliation: 'Fortis Hospital',
        city: 'Delhi',
        state: 'Delhi',
        status: 'active',
        initials: 'AP',
        avatarColor: 'bg-green-100 text-green-600'
    },
    {
        id: 4,
        name: 'Dr. Sneha Reddy',
        specialty: 'Pediatrics',
        email: 'sneha.reddy@hospital.com',
        phone: '+91-9876543213',
        hospital_affiliation: 'AIIMS',
        city: 'Bangalore',
        state: 'Karnataka',
        status: 'inactive',
        initials: 'SR',
        avatarColor: 'bg-yellow-100 text-yellow-600'
    }
];

export const interactions = [
    {
        id: 1,
        hcp_id: 1,
        interaction_type: 'in-person',
        interaction_date: '2024-05-15',
        duration_minutes: 30,
        summary: 'Discussed CardioMax efficacy for elderly patients.',
        outcome: 'positive',
        ai_confidence_score: 0.92,
        ai_sentiment: 'Positive',
        status: 'approved',
        created_at: '2024-05-15T10:00:00Z',
        products: [1], // CardioMax
        topics: [1, 2] // Drug Efficacy, Side Effects
    },
    {
        id: 2,
        hcp_id: 1,
        interaction_type: 'email',
        interaction_date: '2024-05-20',
        duration_minutes: 5,
        summary: 'Requested additional samples for clinic.',
        outcome: 'neutral',
        ai_confidence_score: 0.98,
        ai_sentiment: 'Neutral',
        status: 'submitted',
        created_at: '2024-05-20T14:30:00Z',
        products: [1],
        topics: [5] // Patient Compliance
    },
    {
        id: 3,
        hcp_id: 2,
        interaction_type: 'video-call',
        interaction_date: '2024-06-01',
        duration_minutes: 45,
        summary: 'Detailed review of OncoGuard Phase 3 trials.',
        outcome: 'positive',
        ai_confidence_score: 0.88,
        ai_sentiment: 'Excited',
        status: 'draft',
        created_at: '2024-06-01T09:15:00Z',
        products: [2],
        topics: [4, 8] // Clinical Trials, New Product Launch
    },
    {
        id: 4,
        hcp_id: 3,
        interaction_type: 'phone-call',
        interaction_date: '2024-06-10',
        duration_minutes: 15,
        summary: 'Concern regarding pricing of NeuroShield vs competitors.',
        outcome: 'negative',
        ai_confidence_score: 0.75,
        ai_sentiment: 'Concerned',
        status: 'submitted',
        created_at: '2024-06-10T11:45:00Z',
        products: [3],
        topics: [6, 7] // Pricing, Competitors
    }
];

export const interactionData = [
    {
        id: 1,
        interaction_id: 1,
        raw_input: "Met with Dr. Kumar today. He is seeing good results with CardioMax in elderly hypertensives. Main query was about dizziness as a side effect. He seems happy with the profile overall.",
        extracted_fields: {
            key_points: ["Good results in elderly", "Query about dizziness"],
            mentioned_products: ["CardioMax"],
            hcp_mood: "Satisfied"
        },
        follow_up_actions: [
            { action: "send_material", description: "Send clinical study on dizziness profile in elderly", deadline: "2024-05-22", priority: "medium" }
        ],
        llm_model_used: "GPT-4",
        processing_time_ms: 1200
    },
    {
        id: 3,
        interaction_id: 3,
        raw_input: "Video sync with Dr. Sharma. She is very interested in the new lung cancer data from Phase 3. Wants to start a small pilot patient group. Asked about support programs.",
        extracted_fields: {
            key_points: ["Phase 3 data interest", "Wants pilot group", "Support program inquiry"],
            mentioned_products: ["OncoGuard"],
            hcp_mood: "Enthusiastic"
        },
        follow_up_actions: [
            { action: "meeting", description: "Schedule protocol review for pilot", deadline: "2024-06-05", priority: "high" },
            { action: "send_material", description: "Patient support program brochure", deadline: "2024-06-03", priority: "high" }
        ],
        llm_model_used: "GPT-4",
        processing_time_ms: 1450
    },
    {
        id: 4,
        interaction_id: 4,
        raw_input: "Dr. Patel called. He thinks NeuroShield is too expensive compared to Generic X. Unless we can show better compliance data, he might switch.",
        extracted_fields: {
            key_points: ["Price objection", "Comparison to Generic X", "Compliance data needed"],
            mentioned_products: ["NeuroShield"],
            hcp_mood: "Skeptical"
        },
        follow_up_actions: [
            { action: "send_material", description: "HEOR data on cost-effectiveness", deadline: "2024-06-12", priority: "urgent" }
        ],
        llm_model_used: "GPT-3.5-Turbo",
        processing_time_ms: 800
    }
];

// Helper to get full details
export const getHCPDetails = (id) => {
    const hcp = hcps.find(h => h.id === parseInt(id));
    if (!hcp) return null;

    const hcpInteractions = interactions.filter(i => i.hcp_id === parseInt(id));
    return { ...hcp, interactions: hcpInteractions };
};

export const getInteractionDetails = (id) => {
    const interaction = interactions.find(i => i.id === parseInt(id));
    if (!interaction) return null;

    const hcp = hcps.find(h => h.id === interaction.hcp_id);
    const data = interactionData.find(d => d.interaction_id === parseInt(id));

    // Resolve relations
    const resolvedProducts = products.filter(p => interaction.products && interaction.products.includes(p.id));
    const resolvedTopics = topics.filter(t => interaction.topics && interaction.topics.includes(t.id));

    return {
        ...interaction,
        hcpName: hcp ? hcp.name : 'Unknown',
        hcpSpecialty: hcp ? hcp.specialty : '',
        aiData: data,
        resolvedProducts,
        resolvedTopics
    };
};
