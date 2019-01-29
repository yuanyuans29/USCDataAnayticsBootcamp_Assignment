Attribute VB_Name = "Module1"
Option Explicit
Sub totalvolumeovertheyear()

    'define my variables
    Dim i As Long
    Dim Numrows As Long
    Dim totalvol As Double
    Dim sum_row As Integer
    Dim vol As Long
    Dim x As Integer
    Dim o_price As Double
    Dim c_price As Double
    Dim delta As Double
    Dim percent_change As Variant
    Dim Gper_increase As Double
    Dim Gper_decrease As Double
    Dim Gtotal_vol As Variant
    Dim n As Long
    Dim Numrows_2 As Long
    
    
    'Numrows is the last row before blank rows
    Numrows = Range("A2", Range("A2").End(xlDown)).Rows.Count

    'initiate summary table row, set total volume as 0 at the beginning of the year and open price of first ticker
    sum_row = 2
    totalvol = 0
    o_price = Cells(2, 3).Value

        'loop through all tickers
        For i = 2 To Numrows
        
        'Calculate Total amount of volume each stock
        vol = Cells(i, 7).Value
        totalvol = totalvol + vol

            'If ticker symbol changes, calculate the yearly price change, percent change and the total amount of volume each stock sold that year
            If Cells(i, 1).Value <> Cells(i + 1, 1).Value Then
            c_price = Cells(i, 6).Value
            delta = c_price - o_price
            percent_change = delta / o_price
            Cells(sum_row, 11).Value = totalvol
            'display the ticker symbol, price difference, percent_change and the total volume
            Cells(sum_row, 8).Value = Cells(i, 1).Value
            Cells(sum_row, 9).Value = delta
            Cells(sum_row, 10).Value = percent_change
            'reset total amount
            o_price = Cells(i + 1, 3).Value
            totalvol = 0
            'put the summary of next ticker in next summary table row
            sum_row = sum_row + 1

            Else

            End If

        Next i
    
    'Find the ticker with greatest % increase
    Gper_increase = Application.WorksheetFunction.Max(Columns("J"))
    Cells(2, 16).Value = Gper_increase
    'Find the ticker with greatest % decrease
    Gper_decrease = Application.WorksheetFunction.Min(Columns("J"))
    Cells(3, 16).Value = Gper_decrease
    'Find the ticker with greatest volume sold
    Gtotal_vol = Application.WorksheetFunction.Max(Columns("K"))
    Cells(4, 16).Value = Gtotal_vol

    
    Numrows_2 = Range("H2", Range("H2").End(xlDown)).Rows.Count
    
    'Go though the loop to find ticker symbol with greatest %increase, greatest %decrease and greatest volume
    For n = 2 To Numrows_2
        If Cells(n, 10).Value = Gper_increase Then
        Cells(2, 15).Value = Cells(n, 8).Value

        ElseIf Cells(n, 10).Value = Gper_decrease Then
        Cells(3, 15).Value = Cells(n, 8).Value

        Else
        End If

        If Cells(n, 11).Value = Gtotal_vol Then
        Cells(4, 15).Value = Cells(n, 8).Value

        Else
        End If
    Next n

End Sub

