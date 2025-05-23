import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get('_page') || '1';
    const limit = searchParams.get('_limit') || '10';
    
    const name = searchParams.get('name_like');
    const category = searchParams.get('category');
    
    let apiUrl = 'http://localhost:3001/menuItems?';
    const params = new URLSearchParams();
    
    params.append('_page', page);
    params.append('_limit', limit);
    
    if (name) params.append('name_like', name);
    if (category) params.append('category', category);
    
    const response = await fetch(`${apiUrl}${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    
    const menuItems = await response.json();
    
    const totalCount = response.headers.get('X-Total-Count');
    
    return NextResponse.json({
      items: menuItems,
      totalCount: parseInt(totalCount || '0'),
      currentPage: parseInt(page),
      limit: parseInt(limit)
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const newItem = {
      id: data.id,
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      availability: data.availability ?? true
    };

    const response = await fetch('http://localhost:3001/menuItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create menu item');
    }
    
    const createdItem = await response.json();
    return NextResponse.json(createdItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id } = data;
    
    // Ensure consistent property order in updates too
    const updatedItem = {
      id: data.id,
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      availability: data.availability ?? true
    };
    
    const response = await fetch(`http://localhost:3001/menuItems/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    
    const responseItem = await response.json();
    return NextResponse.json(responseItem, { status: 200 });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const response = await fetch(`http://localhost:3001/menuItems/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }
    
    return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
