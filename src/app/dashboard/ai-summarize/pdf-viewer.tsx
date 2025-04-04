"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MagnifyingGlassPlus as ZoomInIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus";
import { MagnifyingGlassMinus as ZoomOutIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassMinus";
import { ArrowSquareOut as JumpToIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface TextPosition {
  text: string;
  startIndex: number;
  endIndex: number;
  context?: string;
}

interface PageHighlightData {
  pageNumber: number;
  textPositions: TextPosition[];
}

interface PDFViewerProps {
  pdfUrl: string;
  highlightedLocation?: string;
  highlightText?: string;
  highlightData?: PageHighlightData[];
}

export function PDFViewer({ pdfUrl, highlightedLocation, highlightText, highlightData }: PDFViewerProps): React.JSX.Element {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [scale, setScale] = React.useState(1.2);
  const [error, setError] = React.useState<string | null>(null);
  const [isZooming, setIsZooming] = React.useState(false);
  const [highlightedPage, setHighlightedPage] = React.useState<number | null>(null);
  const [endPage, setEndPage] = React.useState<number | null>(null);
  const [isNewHighlight, setIsNewHighlight] = React.useState(false);
  const zoomTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null!);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastLocationRef = React.useRef<string | undefined>(undefined);
  const lastHighlightTextRef = React.useRef<string | undefined>(undefined);
  const pdfDocumentRef = React.useRef<PDFDocumentProxy | null>(null);
  const [pageTexts, setPageTexts] = React.useState<Record<number, string>>({});

  // Parse the highlighted location to get the page number
  React.useEffect(() => {
    if (highlightedLocation !== lastLocationRef.current) {
      // Trigger flash animation when location changes
      setIsNewHighlight(true);
      setTimeout(() => setIsNewHighlight(false), 1500);
      lastLocationRef.current = highlightedLocation;
    }

    if (!highlightedLocation) {
      setHighlightedPage(null);
      setEndPage(null);
      return;
    }

    // Parse the location string to extract page number(s)
    // Format examples: "Page 12", "Page 3-4", "Page 10, Section 2.3"
    const match = highlightedLocation.match(/Page\s+(\d+)(?:-(\d+))?/i);
    if (match) {
      const startPage = parseInt(match[1], 10);
      setHighlightedPage(startPage);
      
      // Check if there's a range (e.g., "Page 3-5")
      if (match[2]) {
        setEndPage(parseInt(match[2], 10));
      } else {
        setEndPage(null);
      }
      
      // Scroll to the highlighted page once loaded
      if (containerRef.current && numPages !== null) {
        setTimeout(() => {
          const pageElement = containerRef.current?.querySelector(`.page-${startPage}`);
          pageElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      setHighlightedPage(null);
      setEndPage(null);
    }
  }, [highlightedLocation, numPages]);

  // Function to highlight text based on character positions
  const highlightTextByPosition = (pageNumber: number, textPositions: TextPosition[]) => {
    setTimeout(() => {
      if (!containerRef.current) return;
      
      const pageElement = containerRef.current.querySelector(`.page-${pageNumber} .react-pdf__Page__textContent`);
      if (!pageElement) return;

      // Remove previous highlights
      pageElement.querySelectorAll('.text-highlight').forEach(el => {
        el.classList.remove('text-highlight');
      });

      // Get all text nodes from this page
      const textNodes = Array.from(pageElement.querySelectorAll('span'));
      let currentIndex = 0;

      // Create a map of character positions to text nodes
      const nodeMap = new Map<number, Element>();
      textNodes.forEach(node => {
        const text = node.textContent || '';
        for (let i = 0; i < text.length; i++) {
          nodeMap.set(currentIndex + i, node);
        }
        currentIndex += text.length;
      });

      // Apply highlighting based on text positions
      textPositions.forEach(({ startIndex, endIndex }) => {
        for (let i = startIndex; i < endIndex; i++) {
          const node = nodeMap.get(i);
          if (node) {
            node.classList.add('text-highlight');
          }
        }
      });
    }, 300);
  };

  // Handle text extraction and highlighting when pages render
  React.useEffect(() => {
    if (!highlightData) return;

    highlightData.forEach(({ pageNumber, textPositions }) => {
      highlightTextByPosition(pageNumber, textPositions);
    });
  }, [highlightData]);

  // Apply text highlighting when highlightText changes or when pages render
  React.useEffect(() => {
    if (!highlightText) return;

    // If the highlight text changed, save it for comparison
    if (highlightText !== lastHighlightTextRef.current) {
      lastHighlightTextRef.current = highlightText;
    }

    // Function to highlight text in a specific page
    const highlightTextInPage = (pageNumber: number) => {
      setTimeout(() => {
        if (!containerRef.current) return;
        
        // Find the text layer for this page
        const pageElement = containerRef.current.querySelector(`.page-${pageNumber} .react-pdf__Page__textContent`);
        if (!pageElement) return;

        // Remove previous highlights first
        pageElement.querySelectorAll('.text-highlight').forEach(el => {
          el.classList.remove('text-highlight');
        });

        if (!highlightText) return;

        // Prepare text for highlighting - normalize the answer text
        const normalizedHighlightText = highlightText
          .replace(/\s+/g, ' ')  // Normalize whitespace
          .toLowerCase();

        // Extract meaningful phrases for more precise matching
        const extractPhrases = (text: string, minLength = 3): string[] => {
          const words = text.split(/\s+/);
          const phrases: string[] = [];
          
          // Generate phrases of varying lengths
          for (let length = Math.min(6, words.length); length >= minLength; length--) {
            for (let i = 0; i <= words.length - length; i++) {
              const phrase = words.slice(i, i + length).join(' ');
              if (phrase.length >= 12) { // Minimum character length for a meaningful phrase
                phrases.push(phrase);
              }
            }
          }
          
          return phrases;
        };

        // Extract significant phrases from the highlight text
        const phrases = extractPhrases(normalizedHighlightText);
        
        // Also extract individual significant words for fallback matching
        const words = normalizedHighlightText.split(/\s+/);
        const significantWords = words.filter(word => 
          word.length >= 4 && 
          !['this', 'that', 'with', 'from', 'have', 'were', 'their', 'they', 'would', 'could', 'should', 'about'].includes(word)
        );

        // Get all text nodes from this page
        const textNodes = Array.from(pageElement.querySelectorAll('span'));
        
        // First attempt to highlight phrases (more precise)
        let phraseMatches = 0;
        if (phrases.length > 0) {
          // Create a single string from all text nodes to search for phrases
          const pageText = textNodes.map(node => node.textContent || '').join(' ').toLowerCase();
          
          phrases.forEach(phrase => {
            if (pageText.includes(phrase)) {
              phraseMatches++;
              
              // Now find which nodes contain parts of this phrase
              let phraseRegex = new RegExp(phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
              let currentPhrase = '';
              let matchingNodes: Element[] = [];
              
              // Build up the phrase across nodes and track which ones to highlight
              for (let i = 0; i < textNodes.length; i++) {
                const node = textNodes[i];
                const nodeText = node.textContent || '';
                currentPhrase += ' ' + nodeText;
                
                if (phraseRegex.test(currentPhrase.toLowerCase())) {
                  // We found a complete phrase, highlight all collected nodes
                  matchingNodes.push(node);
                  matchingNodes.forEach(n => n.classList.add('text-highlight'));
                  currentPhrase = '';
                  matchingNodes = [];
                } else if (phrase.toLowerCase().includes(nodeText.toLowerCase().trim()) ||
                          nodeText.length > 3) {
                  // This node might be part of the phrase
                  matchingNodes.push(node);
                }
              }
            }
          });
        }
        
        // If no phrases matched, fall back to word-based highlighting
        if (phraseMatches === 0 && significantWords.length > 0) {
          textNodes.forEach(node => {
            const text = (node.textContent || '').toLowerCase();
            const shouldHighlight = significantWords.some(word => text.includes(word));
            
            if (shouldHighlight) {
              node.classList.add('text-highlight');
            }
          });
        }
      }, 500); // Delay to ensure text layer is rendered
    };

    // Apply highlighting to visible pages
    if (highlightedPage !== null) {
      highlightTextInPage(highlightedPage);
      
      // If we have a range, highlight all pages in the range
      if (endPage) {
        for (let i = highlightedPage + 1; i <= endPage; i++) {
          highlightTextInPage(i);
        }
      }
    }
  }, [highlightText, highlightedPage, endPage, numPages]);

  // Handle jumping to end page of a range
  const handleJumpToEndPage = () => {
    if (endPage && containerRef.current) {
      const pageElement = containerRef.current.querySelector(`.page-${endPage}`);
      pageElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function onDocumentLoadSuccess({ numPages, ...rest }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
    // Store the PDF document reference for potential future use
    if ('_pdfInfo' in rest) {
      pdfDocumentRef.current = rest as unknown as PDFDocumentProxy;
    }
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setError(error.message);
  }

  const debouncedSetScale = React.useCallback((newScale: number) => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    setScale(newScale);
    setIsZooming(true);
    
    zoomTimeoutRef.current = setTimeout(() => {
      setIsZooming(false);
    }, 150);
  }, []);

  const handleZoomIn = () => {
    const newScale = Math.min(scale + 0.2, 2.5);
    debouncedSetScale(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.2, 0.8);
    debouncedSetScale(newScale);
  };

  // Function to determine if a page is in the highlighted range
  const isPageHighlighted = (pageNumber: number) => {
    if (highlightedPage === null) return false;
    
    if (endPage) {
      // If there's a range, check if the page is within the range
      return pageNumber >= highlightedPage && pageNumber <= endPage;
    }
    
    // Otherwise, just check if it matches the highlighted page
    return pageNumber === highlightedPage;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        borderLeft: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Custom styling for highlighted text */}
      <style jsx global>{`
        .text-highlight {
          background-color: rgba(255, 235, 59, 0.6) !important;
          border-radius: 2px;
          padding: 0 1px;
          margin: 0 -1px;
          transition: background-color 0.15s ease;
        }
        
        .text-highlight:hover {
          background-color: rgba(255, 152, 0, 0.6) !important;
        }
      `}</style>

      {/* Highlighted Location Indicator */}
      {highlightedLocation && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 1,
            py: 0.5,
            px: 1.5,
            boxShadow: 1,
            animation: isNewHighlight ? 
              'pulse 1.5s ease-in-out' : 'none',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.7)' },
              '50%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' }
            }
          }}
        >
          <Typography variant="caption" fontWeight="bold">
            {highlightedLocation}
          </Typography>
          {endPage && (
            <Button 
              startIcon={<JumpToIcon weight="bold" />}
              size="small"
              onClick={handleJumpToEndPage}
              variant="contained"
              color="inherit"
              sx={{ 
                minWidth: 0, 
                p: '2px 8px',
                fontSize: '0.65rem',
                lineHeight: 1,
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              Go to Page {endPage}
            </Button>
          )}
        </Box>
      )}
      
      {/* Floating Controls */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 5,
          display: "flex",
          gap: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 0.5,
          boxShadow: 1,
        }}
      >
        <IconButton 
          onClick={handleZoomOut} 
          size="small" 
          disabled={scale <= 0.8 || isZooming}
        >
          <ZoomOutIcon />
        </IconButton>
        <IconButton 
          onClick={handleZoomIn} 
          size="small" 
          disabled={scale >= 2.5 || isZooming}
        >
          <ZoomInIcon />
        </IconButton>
      </Box>

      {/* PDF Container */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          bgcolor: "#f5f5f5",
          "& .react-pdf__Document": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          },
          "& .react-pdf__Page": {
            marginBottom: 2,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          },
          "& .react-pdf__Page__canvas": {
            maxWidth: "auto",
            height: "auto !important",
          }
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
              Loading PDF...
            </Box>
          }
          error={
            <Box sx={{ p: 2, color: "error.main" }}>
              {error || 'Failed to load PDF. Please try again.'}
            </Box>
          }
        >
          {Array.from(new Array(numPages), (_, index) => {
            const pageNumber = index + 1;
            const highlighted = isPageHighlighted(pageNumber);
            
            return (
              <Box
                key={`page-container-${pageNumber}`}
                className={`page-${pageNumber}`}
                sx={{
                  position: 'relative',
                  width: '100%',
                  mb: 2,
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  loading={null}
                  renderTextLayer={true} // Always render text layer for highlighting
                  renderAnnotationLayer={!isZooming}
                  onGetTextSuccess={() => {
                    if (highlighted && highlightText) {
                      setTimeout(() => {
                        if (containerRef.current) {
                          const pageElement = containerRef.current.querySelector(`.page-${pageNumber} .react-pdf__Page__textContent`);
                          if (pageElement) {
                            // Remove previous highlights first
                            pageElement.querySelectorAll('.text-highlight').forEach(el => {
                              el.classList.remove('text-highlight');
                            });

                            // Prepare text for highlighting - normalize the answer text
                            const normalizedHighlightText = highlightText
                              .replace(/\s+/g, ' ')  // Normalize whitespace
                              .toLowerCase();

                            // Extract meaningful phrases for more precise matching
                            const extractPhrases = (text: string, minLength = 3): string[] => {
                              const words = text.split(/\s+/);
                              const phrases: string[] = [];
                              
                              // Generate phrases of varying lengths
                              for (let length = Math.min(6, words.length); length >= minLength; length--) {
                                for (let i = 0; i <= words.length - length; i++) {
                                  const phrase = words.slice(i, i + length).join(' ');
                                  if (phrase.length >= 12) { // Minimum character length for a meaningful phrase
                                    phrases.push(phrase);
                                  }
                                }
                              }
                              
                              return phrases;
                            };

                            // Extract significant phrases from the highlight text
                            const phrases = extractPhrases(normalizedHighlightText);
                            
                            // Also extract individual significant words for fallback matching
                            const words = normalizedHighlightText.split(/\s+/);
                            const significantWords = words.filter(word => 
                              word.length >= 4 && 
                              !['this', 'that', 'with', 'from', 'have', 'were', 'their', 'they', 'would', 'could', 'should', 'about'].includes(word)
                            );

                            // Get all text nodes from this page
                            const textNodes = Array.from(pageElement.querySelectorAll('span'));
                            
                            // First attempt to highlight phrases (more precise)
                            let phraseMatches = 0;
                            if (phrases.length > 0) {
                              // Create a single string from all text nodes to search for phrases
                              const pageText = textNodes.map(node => node.textContent || '').join(' ').toLowerCase();
                              
                              phrases.forEach(phrase => {
                                if (pageText.includes(phrase)) {
                                  phraseMatches++;
                                  
                                  // Now find which nodes contain parts of this phrase
                                  let phraseRegex = new RegExp(phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
                                  let currentPhrase = '';
                                  let matchingNodes: Element[] = [];
                                  
                                  // Build up the phrase across nodes and track which ones to highlight
                                  for (let i = 0; i < textNodes.length; i++) {
                                    const node = textNodes[i];
                                    const nodeText = node.textContent || '';
                                    currentPhrase += ' ' + nodeText;
                                    
                                    if (phraseRegex.test(currentPhrase.toLowerCase())) {
                                      // We found a complete phrase, highlight all collected nodes
                                      matchingNodes.push(node);
                                      matchingNodes.forEach(n => n.classList.add('text-highlight'));
                                      currentPhrase = '';
                                      matchingNodes = [];
                                    } else if (phrase.toLowerCase().includes(nodeText.toLowerCase().trim()) ||
                                              nodeText.length > 3) {
                                      // This node might be part of the phrase
                                      matchingNodes.push(node);
                                    }
                                  }
                                }
                              });
                            }
                            
                            // If no phrases matched, fall back to word-based highlighting
                            if (phraseMatches === 0 && significantWords.length > 0) {
                              textNodes.forEach(node => {
                                const text = (node.textContent || '').toLowerCase();
                                const shouldHighlight = significantWords.some(word => text.includes(word));
                                
                                if (shouldHighlight) {
                                  node.classList.add('text-highlight');
                                }
                              });
                            }
                          }
                        }
                      }, 300); // Small delay to ensure text layer is rendered
                    }
                  }}
                />
                {highlighted && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 4,
                      boxShadow: 2,
                      animation: isNewHighlight && pageNumber === highlightedPage ? 
                        'fade-in 0.5s ease-in-out' : 'none',
                      '@keyframes fade-in': {
                        '0%': { opacity: 0, transform: 'translateY(-10px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}
                  >
                    {endPage ? 
                      (pageNumber === highlightedPage ? 'Start of Range' : 
                       pageNumber === endPage ? 'End of Range' : 'In Range') : 
                      'Referenced Location'}
                  </Box>
                )}
              </Box>
            );
          })}
        </Document>
      </Box>
    </Box>
  );
} 