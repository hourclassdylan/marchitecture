// src/components/MarketMapDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MarketMapDetail = () => {
  const { id } = useParams();
  const [marketMap, setMarketMap] = useState(null);
  const [sections, setSections] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketMapData = async () => {
      setLoading(true);

      // Fetch market map details
      const { data: marketMapData, error: marketMapError } = await supabase
        .from('market_maps')
        .select('*')
        .eq('id', id)
        .single();
      if (marketMapError) {
        console.error('Error fetching market map:', marketMapError);
      } else {
        setMarketMap(marketMapData);

        // Fetch sections for the market map
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
      .select('*')
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

  if (loading) return <p>Loading...</p>;
  if (!marketMap) return <p>Market Map not found.</p>;

  const sectionColors = ['#e0f7fa', '#f1f8e9', '#ffe0b2', '#ffebee'];

  return (
    <div className="market-map-detail">
      <h2>{marketMap.name}</h2>

      <div className="sidebar">
        <h2>Sections</h2>
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
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="section-link"
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
      </div>

      <div className="main-content">
        <div className="section-container">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="section"
              style={{ backgroundColor: sectionColors[index % sectionColors.length] }}
            >
              <h3>{section.name}</h3>
              <div className="subcategory-container">
                {(subcategories[section.id] || []).map((subcategory) => (
                  <div key={subcategory.id} className="subcategory-box">
                    <h4>{subcategory.name}</h4>
                    <div className="company-container">
                      {(companies[subcategory.id] || []).map((company) => (
                        <div key={company.id} className="company-box">
                          <p><strong>{company.name}</strong></p>
                          <p><a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
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
    </div>
  );
};

export default MarketMapDetail;