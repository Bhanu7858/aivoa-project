-- =====================================================
-- AI-First CRM - HCP Module Database Schema (MySQL)
-- =====================================================
-- Purpose: Store Healthcare Professional interactions
-- with AI-driven logging, editing, and context management
-- =====================================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS interaction_follow_ups;
DROP TABLE IF EXISTS interaction_topics;
DROP TABLE IF EXISTS interaction_products;
DROP TABLE IF EXISTS interaction_data;
DROP TABLE IF EXISTS interactions;
DROP TABLE IF EXISTS hcps;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS topics;

-- =====================================================
-- Table: hcps (Healthcare Professionals)
-- =====================================================
CREATE TABLE hcps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    hospital_affiliation VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    status ENUM('active', 'inactive', 'blocked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_specialty (specialty),
    INDEX idx_name (name),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: products (Pharmaceutical Products)
-- =====================================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: topics (Discussion Topics)
-- =====================================================
CREATE TABLE topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: interactions (Main Interaction Log)
-- =====================================================
CREATE TABLE interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hcp_id INT NOT NULL,
    interaction_type ENUM('in-person', 'phone-call', 'email', 'video-call', 'conference', 'other') NOT NULL,
    interaction_date DATE NOT NULL,
    interaction_time TIME,
    duration_minutes INT,
    location VARCHAR(255),
    summary TEXT NOT NULL,
    outcome ENUM('positive', 'neutral', 'negative', 'follow-up-required') DEFAULT 'neutral',
    
    -- AI-generated fields
    ai_confidence_score DECIMAL(3,2),
    ai_sentiment VARCHAR(50),
    
    -- Status tracking
    status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
    
    -- Metadata
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (hcp_id) REFERENCES hcps(id) ON DELETE CASCADE,
    INDEX idx_hcp_id (hcp_id),
    INDEX idx_interaction_date (interaction_date),
    INDEX idx_interaction_type (interaction_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: interaction_data (AI Processing Data)
-- =====================================================
CREATE TABLE interaction_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interaction_id INT NOT NULL,
    
    -- Raw input from user
    raw_input TEXT NOT NULL,
    input_source ENUM('chat', 'form', 'voice') DEFAULT 'chat',
    
    -- AI-extracted fields (stored as JSON)
    extracted_fields JSON,
    -- Example structure:
    -- {
    --   "key_points": ["discussed product benefits", "scheduled follow-up"],
    --   "mentioned_products": ["Product A", "Product B"],
    --   "concerns_raised": ["pricing", "side effects"],
    --   "hcp_mood": "positive"
    -- }
    
    -- Follow-up actions (stored as JSON)
    follow_up_actions JSON,
    -- Example structure:
    -- [
    --   {"action": "send_literature", "deadline": "2025-02-15", "priority": "high"},
    --   {"action": "schedule_meeting", "deadline": "2025-02-20", "priority": "medium"}
    -- ]
    
    -- LLM metadata
    llm_model_used VARCHAR(100),
    llm_tokens_used INT,
    processing_time_ms INT,
    
    -- Version tracking (for edits)
    version INT DEFAULT 1,
    is_latest BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (interaction_id) REFERENCES interactions(id) ON DELETE CASCADE,
    INDEX idx_interaction_id (interaction_id),
    INDEX idx_input_source (input_source),
    INDEX idx_is_latest (is_latest)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: interaction_products (Many-to-Many)
-- =====================================================
CREATE TABLE interaction_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interaction_id INT NOT NULL,
    product_id INT NOT NULL,
    discussion_level ENUM('mentioned', 'discussed', 'presented', 'sampled') DEFAULT 'mentioned',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (interaction_id) REFERENCES interactions(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_interaction_product (interaction_id, product_id),
    INDEX idx_interaction_id (interaction_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: interaction_topics (Many-to-Many)
-- =====================================================
CREATE TABLE interaction_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interaction_id INT NOT NULL,
    topic_id INT NOT NULL,
    importance ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (interaction_id) REFERENCES interactions(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    UNIQUE KEY unique_interaction_topic (interaction_id, topic_id),
    INDEX idx_interaction_id (interaction_id),
    INDEX idx_topic_id (topic_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: interaction_follow_ups (Follow-up Actions)
-- =====================================================
CREATE TABLE interaction_follow_ups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interaction_id INT NOT NULL,
    action_type ENUM('call', 'email', 'meeting', 'send_material', 'send_sample', 'other') NOT NULL,
    description TEXT,
    due_date DATE,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('pending', 'in-progress', 'completed', 'cancelled') DEFAULT 'pending',
    assigned_to VARCHAR(100),
    completed_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (interaction_id) REFERENCES interactions(id) ON DELETE CASCADE,
    INDEX idx_interaction_id (interaction_id),
    INDEX idx_due_date (due_date),
    INDEX idx_status (status),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sample Data Insertion
-- =====================================================

-- Insert sample HCPs
INSERT INTO hcps (name, specialty, email, phone, hospital_affiliation, city, state) VALUES
('Dr. Rajesh Kumar', 'Cardiology', 'rajesh.kumar@hospital.com', '+91-9876543210', 'Apollo Hospital', 'Mumbai', 'Maharashtra'),
('Dr. Priya Sharma', 'Oncology', 'priya.sharma@hospital.com', '+91-9876543211', 'Tata Memorial', 'Mumbai', 'Maharashtra'),
('Dr. Amit Patel', 'Neurology', 'amit.patel@hospital.com', '+91-9876543212', 'Fortis Hospital', 'Delhi', 'Delhi'),
('Dr. Sneha Reddy', 'Pediatrics', 'sneha.reddy@hospital.com', '+91-9876543213', 'AIIMS', 'Bangalore', 'Karnataka');

-- Insert sample products
INSERT INTO products (name, category, description) VALUES
('CardioMax 50mg', 'Cardiovascular', 'Beta-blocker for hypertension management'),
('OncoGuard 100mg', 'Oncology', 'Chemotherapy agent for lung cancer'),
('NeuroShield 25mg', 'Neurology', 'Anti-epileptic medication'),
('PediaVita Syrup', 'Pediatrics', 'Multivitamin supplement for children');

-- Insert sample topics
INSERT INTO topics (name, category) VALUES
('Drug Efficacy', 'Clinical'),
('Side Effects', 'Safety'),
('Dosage Guidelines', 'Clinical'),
('Clinical Trials', 'Research'),
('Patient Compliance', 'Treatment'),
('Pricing & Reimbursement', 'Commercial'),
('Competitive Products', 'Market'),
('New Product Launch', 'Marketing');

-- =====================================================
-- Useful Queries for the Application
-- =====================================================

-- Query 1: Get HCP with recent interactions
DELIMITER //
CREATE PROCEDURE GetHCPContext(IN p_hcp_id INT)
BEGIN
    SELECT 
        h.name,
        h.specialty,
        i.interaction_date,
        i.interaction_type,
        i.summary,
        i.outcome
    FROM hcps h
    LEFT JOIN interactions i ON h.id = i.hcp_id
    WHERE h.id = p_hcp_id
    ORDER BY i.interaction_date DESC
    LIMIT 10;
END //
DELIMITER ;

-- Query 2: Get interaction with all related data
DELIMITER //
CREATE PROCEDURE GetInteractionDetails(IN p_interaction_id INT)
BEGIN
    -- Main interaction
    SELECT * FROM interactions WHERE id = p_interaction_id;
    
    -- AI processing data
    SELECT * FROM interaction_data WHERE interaction_id = p_interaction_id AND is_latest = TRUE;
    
    -- Products discussed
    SELECT p.name, ip.discussion_level 
    FROM interaction_products ip
    JOIN products p ON ip.product_id = p.id
    WHERE ip.interaction_id = p_interaction_id;
    
    -- Topics covered
    SELECT t.name, it.importance
    FROM interaction_topics it
    JOIN topics t ON it.topic_id = t.id
    WHERE it.interaction_id = p_interaction_id;
    
    -- Follow-ups
    SELECT * FROM interaction_follow_ups 
    WHERE interaction_id = p_interaction_id
    ORDER BY due_date;
END //
DELIMITER ;

-- =====================================================
-- Views for Common Queries
-- =====================================================

-- View: Latest interactions with HCP details
CREATE VIEW v_latest_interactions AS
SELECT 
    i.id AS interaction_id,
    h.name AS hcp_name,
    h.specialty,
    i.interaction_type,
    i.interaction_date,
    i.summary,
    i.outcome,
    i.status,
    i.created_at
FROM interactions i
JOIN hcps h ON i.hcp_id = h.id
ORDER BY i.created_at DESC;

-- View: Pending follow-ups
CREATE VIEW v_pending_followups AS
SELECT 
    f.id,
    h.name AS hcp_name,
    i.interaction_date,
    f.action_type,
    f.description,
    f.due_date,
    f.priority,
    f.status
FROM interaction_follow_ups f
JOIN interactions i ON f.interaction_id = i.id
JOIN hcps h ON i.hcp_id = h.id
WHERE f.status IN ('pending', 'in-progress')
ORDER BY f.due_date;
