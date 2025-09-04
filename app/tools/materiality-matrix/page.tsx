"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, Edit, Trash2, Download, Save } from "lucide-react";
import { PDFExportService } from "@/lib/pdf-export";
import { useAuth } from "@/hooks/use-auth";

interface MaterialityItem {
  id: string;
  title: string;
  description: string;
  businessImpact: number; // 1-10 scale
  stakeholderConcern: number; // 1-10 scale
  category: 'environmental' | 'social' | 'governance';
}

const defaultItems: MaterialityItem[] = [
  {
    id: '1',
    title: 'Climate Change & GHG Emissions',
    description: 'Managing carbon footprint and climate-related risks',
    businessImpact: 8,
    stakeholderConcern: 9,
    category: 'environmental'
  },
  {
    id: '2',
    title: 'Employee Health & Safety',
    description: 'Workplace safety and occupational health programs',
    businessImpact: 9,
    stakeholderConcern: 8,
    category: 'social'
  },
  {
    id: '3',
    title: 'Data Privacy & Security',
    description: 'Protection of customer and employee data',
    businessImpact: 7,
    stakeholderConcern: 7,
    category: 'governance'
  },
  {
    id: '4',
    title: 'Diversity & Inclusion',
    description: 'Promoting diverse and inclusive workplace',
    businessImpact: 6,
    stakeholderConcern: 8,
    category: 'social'
  },
  {
    id: '5',
    title: 'Water Management',
    description: 'Efficient water use and conservation',
    businessImpact: 5,
    stakeholderConcern: 6,
    category: 'environmental'
  },
  {
    id: '6',
    title: 'Supply Chain Ethics',
    description: 'Ethical sourcing and supplier standards',
    businessImpact: 7,
    stakeholderConcern: 6,
    category: 'governance'
  }
];

export default function MaterialityMatrixPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<MaterialityItem[]>(defaultItems);
  const [selectedItem, setSelectedItem] = useState<MaterialityItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MaterialityItem>>({
    title: '',
    description: '',
    businessImpact: 5,
    stakeholderConcern: 5,
    category: 'environmental'
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'bg-green-500';
      case 'social': return 'bg-blue-500';
      case 'governance': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const addNewItem = () => {
    if (newItem.title && newItem.description) {
      const item: MaterialityItem = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description,
        businessImpact: newItem.businessImpact || 5,
        stakeholderConcern: newItem.stakeholderConcern || 5,
        category: newItem.category as 'environmental' | 'social' | 'governance'
      };
      setItems([...items, item]);
      setNewItem({
        title: '',
        description: '',
        businessImpact: 5,
        stakeholderConcern: 5,
        category: 'environmental'
      });
      setIsAddingNew(false);
    }
  };

  const updateItem = (id: string, updates: Partial<MaterialityItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const handlePDFExport = async () => {
    const success = await PDFExportService.exportMaterialityMatrix(user?.companyName || 'Your Company');
    if (!success) {
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Target className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Materiality Matrix
          </h1>
          <p className="text-lg text-muted-foreground">
            Identify and prioritize your most material ESG topics
          </p>
          <Badge variant="outline" className="mt-2">
            🇲🇾 Malaysian ESG Framework
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Matrix Visualization */}
          <div className="lg:col-span-2">
            <Card id="materiality-matrix">
              <CardHeader>
                <CardTitle>Materiality Matrix</CardTitle>
                <CardDescription>
                  Drag items to reposition them based on business impact and stakeholder concern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-96 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  {/* Axis Labels */}
                  <div className="absolute -left-4 top-1/2 transform -rotate-90 text-sm font-medium text-gray-600">
                    Stakeholder Concern
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                    Business Impact
                  </div>
                  
                  {/* Quadrant Labels */}
                  <div className="absolute top-2 left-2 text-xs text-gray-500">Low Impact, High Concern</div>
                  <div className="absolute top-2 right-2 text-xs text-gray-500">High Impact, High Concern</div>
                  <div className="absolute bottom-8 left-2 text-xs text-gray-500">Low Impact, Low Concern</div>
                  <div className="absolute bottom-8 right-2 text-xs text-gray-500">High Impact, Low Concern</div>

                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border border-gray-200">
                    <div className="border-r border-b border-gray-200"></div>
                    <div className="border-b border-gray-200"></div>
                    <div className="border-r border-gray-200"></div>
                    <div></div>
                  </div>

                  {/* Items */}
                  {items.map((item) => {
                    const x = (item.businessImpact / 10) * 100;
                    const y = 100 - (item.stakeholderConcern / 10) * 100;
                    
                    return (
                      <div
                        key={item.id}
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 ${getCategoryColor(item.category)} hover:scale-125 transition-transform`}
                        style={{ left: `${x}%`, top: `${y}%` }}
                        onClick={() => setSelectedItem(item)}
                        title={item.title}
                      />
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Environmental</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Social</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Governance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Add New Item */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  ESG Topics
                  <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Topic
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New ESG Topic</DialogTitle>
                        <DialogDescription>
                          Define a new material topic for your organization
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Topic Title</Label>
                          <Input
                            id="title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                            placeholder="e.g., Renewable Energy"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                            placeholder="Brief description of this topic"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="business-impact">Business Impact (1-10)</Label>
                            <Input
                              id="business-impact"
                              type="number"
                              min="1"
                              max="10"
                              value={newItem.businessImpact}
                              onChange={(e) => setNewItem({...newItem, businessImpact: parseInt(e.target.value)})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="stakeholder-concern">Stakeholder Concern (1-10)</Label>
                            <Input
                              id="stakeholder-concern"
                              type="number"
                              min="1"
                              max="10"
                              value={newItem.stakeholderConcern}
                              onChange={(e) => setNewItem({...newItem, stakeholderConcern: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            className="w-full p-2 border rounded-md"
                            value={newItem.category}
                            onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
                          >
                            <option value="environmental">Environmental</option>
                            <option value="social">Social</option>
                            <option value="governance">Governance</option>
                          </select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addNewItem}>
                            Add Topic
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedItem?.id === item.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`}></div>
                          <span className="font-medium text-sm">{item.title}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.businessImpact}/{item.stakeholderConcern}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Item Details */}
            {selectedItem && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    Topic Details
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteItem(selectedItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">{selectedItem.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedItem.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Business Impact</Label>
                        <div className="text-2xl font-bold text-primary">
                          {selectedItem.businessImpact}/10
                        </div>
                      </div>
                      <div>
                        <Label>Stakeholder Concern</Label>
                        <div className="text-2xl font-bold text-secondary">
                          {selectedItem.stakeholderConcern}/10
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Badge className={`${getCategoryColor(selectedItem.category)} text-white border-0 mt-1`}>
                        {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Matrix
              </Button>
              <Button variant="outline" className="w-full" onClick={handlePDFExport}>
                <Download className="mr-2 h-4 w-4" />
                Export to PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}