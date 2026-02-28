'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash, Shield, ShieldOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdClick {
  id: string; // This is the IP address
  status: 'monitoring' | 'banned';
  timestamps: Timestamp[];
}

export default function DashboardPage() {
  const { data: adClicks, loading, error } = useCollection<AdClick>('ad_clicks');
  const db = useFirestore();
  const { toast } = useToast();

  const handleStatusChange = async (ip: string, status: 'monitoring' | 'banned') => {
    if (!db) return;
    const docRef = doc(db, 'ad_clicks', ip);
    try {
      await updateDoc(docRef, { status });
      toast({ title: 'نجاح', description: `تم تحديث حالة ${ip} إلى ${status}.` });
    } catch (e) {
      console.error(e);
      toast({ variant: 'destructive', title: 'خطأ', description: 'لم نتمكن من تحديث الحالة.' });
    }
  };

  const handleDelete = async (ip: string) => {
     if (!db) return;
    const docRef = doc(db, 'ad_clicks', ip);
    try {
      await deleteDoc(docRef);
      toast({ title: 'نجاح', description: `تم حذف سجل ${ip}.` });
    } catch (e) {
      console.error(e);
      toast({ variant: 'destructive', title: 'خطأ', description: 'لم نتمكن من حذف السجل.' });
    }
  };

  const sortedAdClicks = [...adClicks].sort((a, b) => {
    if (!a.timestamps || a.timestamps.length === 0) return 1;
    if (!b.timestamps || b.timestamps.length === 0) return -1;
    const lastClickA = a.timestamps[a.timestamps.length - 1];
    const lastClickB = b.timestamps[b.timestamps.length - 1];
    return lastClickB.seconds - lastClickA.seconds;
  });

  if (loading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  }

  if (error) {
    return <div className="p-8 text-center text-destructive">حدث خطأ أثناء تحميل البيانات.</div>;
  }

  return (
    <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">لوحة تحكم النقرات الإعلانية</h1>
        <div className="rounded-lg border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>عنوان IP</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-center">عدد النقرات</TableHead>
                <TableHead>آخر نقرة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {sortedAdClicks.map((click) => (
                <TableRow key={click.id}>
                <TableCell className="font-mono">{click.id}</TableCell>
                <TableCell>
                    <Badge variant={click.status === 'banned' ? 'destructive' : 'secondary'}>
                    {click.status === 'banned' ? 'محظور' : 'مراقبة'}
                    </Badge>
                </TableCell>
                <TableCell className="text-center font-medium">{(click.timestamps || []).length}</TableCell>
                <TableCell>
                  {click.timestamps?.length > 0 
                   ? new Date(click.timestamps[click.timestamps.length - 1].seconds * 1000).toLocaleString('ar-SA')
                   : 'N/A'
                  }
                </TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {click.status === 'monitoring' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(click.id, 'banned')}>
                                <ShieldOff className="ml-2 h-4 w-4" />
                                <span>حظر</span>
                            </DropdownMenuItem>
                        )}
                        {click.status === 'banned' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(click.id, 'monitoring')}>
                                <Shield className="ml-2 h-4 w-4" />
                                <span>إلغاء الحظر</span>
                            </DropdownMenuItem>
                        )}
                         <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(click.id)}>
                            <Trash className="ml-2 h-4 w-4" />
                            <span>حذف</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    </div>
  );
}
