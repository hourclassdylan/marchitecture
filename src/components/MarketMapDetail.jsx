import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { supabase } from '../supabaseClient';
import './MarketMapDetail.css';

const MarketMapDetail = () => {
  const { id } = useParams();
  const [marketMap, setMarketMap] = useState(null);
  const [sections, setSections] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(3);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchMarketMapData = async () => {
      setLoading(true);

      const { data: marketMapData, error: marketMapError } = await supabase
        .from('market_maps')
        .select('*')
        .eq('id', id)
        .single();
      if (marketMapError) {
        console.error('Error fetching market map:', marketMapError);
      } else {
        setMarketMap(marketMapData);

        const { data: sectionsData, error: sectionsError } = await supabase
          .from('sections')
          .select('*')
          .eq('market_map_id', marketMapData.id);
        if (sectionsError) {
          console.error('Error fetching sections:', sectionsError);
        } else {
          setSections(sectionsData);
          sectionsData.forEach((section) => loadSubcategories(section.id));
        }
      }
      setLoading(false);
    };

    fetchMarketMapData();
  }, [id]);

  const loadSubcategories = async (sectionId) => {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('section_id', sectionId);
    if (error) {
      console.error('Error fetching subcategories:', error);
    } else {
      setSubcategories((prev) => ({ ...prev, [sectionId]: data }));
      data.forEach((subcategory) => loadCompanies(subcategory.id));
    }
  };

  const loadCompanies = async (subcategoryId) => {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, description, image_url, website, founded_year, stage, funding_raised')  // Adjust the fields as per your requirements
      .eq('subcategory_id', subcategoryId);
    if (error) {
      console.error('Error fetching companies:', error);
    } else {
      setCompanies((prev) => ({ ...prev, [subcategoryId]: data }));
    }
  };

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [movedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, movedSection);

    setSections(newSections);
  };

  const incrementZoomLevel = () => {
    if (zoomLevel < 5) {
      setZoomLevel(zoomLevel + 1);
    }
  };

  const decrementZoomLevel = () => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleModalClose = () => {
    setSelectedCompany(null);
  };

  const formatFunding = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  if (loading) return <p>Loading...</p>;
  if (!marketMap) return <p>Market Map not found.</p>;

  const sectionColors = ['#e0f7fa', '#f1f8e9', '#ffe0b2', '#ffebee'];  // Define colors here

  return (
    <div className="market-map-detail">
      <div className="sidebar">
        <h2>Sections</h2>
        <p className="drag-notice"><i>Drag the sections to rearrange the order</i></p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                className="section-links-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`section-link ${snapshot.isDragging ? 'dragging' : ''}`}
                        style={{
                          ...provided.draggableProps.style,
                        }}
                        onClick={() => handleScrollToSection(section.id)}
                      >
                        {section.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={incrementZoomLevel}>Zoom In</button>
        <button onClick={decrementZoomLevel}>Zoom Out</button>
      </div>

      <div className={`main-content zoom-${zoomLevel}`}>
        <div className="section-container">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="section"
              style={{
                backgroundColor: sectionColors[index % sectionColors.length],
                transformOrigin: 'top left', // Ensure the scaling works properly
              }}
            >
              <h3>{section.name}</h3>
              <div className="subcategory-container"
                   style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {subcategories[section.id]?.map((subcategory) => (
                  <div key={subcategory.id} className="subcategory-box">
                    <div className="subcategory-header">
                      <h4 className="subcategory-title">{subcategory.name}</h4>
                      <p className="subcategory-description">{subcategory.description}</p>
                    </div>
                    <div className="company-container">
                      {companies[subcategory.id]?.map((company) => (
                        <div
                          key={company.id}
                          className="company-box"
                          onClick={() => handleCompanyClick(company)}
                        >
                          <div className="company-logo-container">
                            {company.image_url && (
                              <img
                                src={company.image_url}
                                alt={company.name}
                                className="company-logo"
                              />
                            )}
                          </div>
                          <div className="company-name-container">
                            <p className="company-name">{company.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCompany && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>{selectedCompany.name}</h2>
            <p><strong>Description:</strong> {selectedCompany.description}</p>
            <p><strong>Year Founded:</strong> {selectedCompany.founded_year}</p>
            <p><strong>Stage:</strong> {selectedCompany.stage}</p>
            <p><strong>Total Funding Raised (mm):</strong> {formatFunding(selectedCompany.funding_raised)}</p>
            <p><strong>Website:</strong> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer">{selectedCompany.website}</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketMapDetail;